interface TaskData {
	id: number;
	name: string;
	note: string;
	checked: boolean;
}

class TaskManager {
	createSingleTask(data: TaskData): DocumentFragment {
		const fragment: DocumentFragment = document.createDocumentFragment();

		const tr: HTMLTableRowElement = document.createElement('tr');
		fragment.appendChild(tr);

		Object.keys(data).forEach((key: string, index: number) => {
			const td: Ref = ref(data[key as keyof TaskData]);
			tr.appendChild(td.dom);
		});
		this.#bindCheckEvent(tr);

		return fragment;
	}

	appendTask(fragment: DocumentFragment): boolean {
		const tbody: HTMLTableSectionElement | null =
			document.querySelector('.tbody');
		if (!tbody) return false;
		tbody.appendChild(fragment);
		return true;
	}

	#bindCheckEvent(tr: HTMLTableRowElement) {
		if (
			!(
				tr.children[3].children[0] &&
				tr.children[3].children[0] instanceof HTMLInputElement
			)
		)
			return false;
		const checkbox: HTMLInputElement = tr.children[3].children[0];
		let id: number = -1;
		if (tr.children[0].textContent) {
			id = Number(tr.children[0].textContent);
		}
		checkbox.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement;
			if (id >= 0) {
				data[id - 1].checked = target.checked;
			}
			localStorage.setItem('data', JSON.stringify(data));
		});
	}
}

class ListManager {
	constructor() {
		const addButton: HTMLSelectElement | null = document.querySelector('.add');
		addButton?.addEventListener('click', this.#handleAddEvent);

		const clearBtn = document.querySelector('.clear');
		clearBtn?.addEventListener('dblclick', this.#handleClear);

    this.#addRemoveEvent();
	}

	#handleAddEvent() {
		// get data
		const nameInput: HTMLInputElement | null = document.querySelector('#name');
		const noteInput: HTMLInputElement | null = document.querySelector('#note');
		if (!(nameInput && noteInput) || !nameInput.value || !noteInput.value)
			return;
		const name = nameInput.value;
		const note = noteInput.value;
		const id = data.length;
		const checked = false;

		// handle database
		const newData = { id, name, note, checked };
		data.push(newData);
		localStorage.setItem('data', JSON.stringify(data));

		// handle view
		const taskDom = taskManager.createSingleTask(newData);
		taskManager.appendTask(taskDom);
		nameInput.value = '';
		noteInput.value = '';
	}

	#handleClear() {
		// handle dataa
		localStorage.clear();
    data = [];

		// handle view
		const tbody = document.querySelector('.tbody');
		if (tbody) {
			while (tbody.firstChild) {
				tbody.removeChild(tbody.firstChild);
			}
		}
	}

  #addRemoveEvent() {
    const table = document.querySelector('table');
    const tbody = document.querySelector('tbody');

    table?.addEventListener('dblclick', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const currentId: number = Number(target.textContent) - 1;

      if (target.classList.contains('taskId')) {
        // handle data
        data = data.filter(item => item.id !== currentId);
        data.forEach((item: TaskData, index: number): void => {
          if (item.id > currentId) {
            data[index].id--;
          }
        });
        localStorage.setItem('data', JSON.stringify(data));

        // handle view
        const row = target.closest('tr');
        if (row && tbody?.contains(row)) {
          tbody?.removeChild(row);
          const ids: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('.taskId');
          ids.forEach(id => {
            if (Number(id.textContent) > currentId) {
              id.textContent = String(Number(id.textContent) - 1);
            }
          })
        }
      }
    });
  }
}

// main
// fetch data
const localData = localStorage.getItem('data');
let data: TaskData[] = [];
if (localData) {
	data = JSON.parse(localData);
} else {
	console.log('no data');
}

const taskManager = new TaskManager();
data.forEach((task: TaskData) => {
	const taskDom = taskManager.createSingleTask(task);
	taskManager.appendTask(taskDom);
});

const listManager = new ListManager();

// async function fetchData(): Promise<TaskData[]> {
//   try {
//     const res: Response = await fetch('../public/data.json');
//     return res.json();
//   } catch(err) {
//     console.log('Error: Fetch data: ', err);
//   }
//
//   return [];
// }

// ref
interface Ref {
	value: boolean | number | string;
	dom: HTMLTableCellElement;
}

function ref(value: boolean | number | string): Ref {
	const dom: HTMLTableCellElement = document.createElement('td');
	if (typeof value === 'boolean') {
		const checkbox: HTMLInputElement = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.checked = value;
		checkbox.classList.add('checkbox');

		dom.appendChild(checkbox);
	} else if (typeof value === 'number') {
		dom.textContent = String(value + 1);
    dom.classList.add('taskId');
	} else {
		dom.textContent = String(value);
	}

	const obj: Ref = { value, dom };
	const handler: ProxyHandler<Ref> = {
		set(target, key, value, receiver): boolean {
			target.dom.textContent = String(target.value);
			return Reflect.set(target, key, value, receiver);
		},
	};

	const p: Ref = new Proxy(obj, handler);

	return p;
}
