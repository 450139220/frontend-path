import fs from 'fs/promises';
import path from 'path';
import { Command } from 'commander';

/*
 * 主程序
 * */
const taskPath: string = path.resolve(__dirname, '../src/data.json');
readTasks(taskPath).then((tasks: Task[]): void => {
  const taskApp: TaskApp = new TaskApp(tasks);

  const commander = new CommandCreator();
  commander.handleCommand(taskApp);
});

/*
 * 功能实现
 * */
// 请求获取数据
async function readTasks(path: string): Promise<Task[]> {
  try {
    const data: string = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch(err) {
    console.log('Error: read file error: ', err);
  }
  return [];
}
// 请求添加数据
function writeTask(path: string, task: Task): void {
  try {
    readTasks(path).then(async (tasks: Task[]): Promise<void> => {
      tasks.push(task);
      await fs.writeFile(path, JSON.stringify(tasks, null, 2), 'utf-8');
      console.log('Add successfully. ');
    });
  } catch(err) {
    console.log('Error: write file error: ', err);
  }
}
// 请求修改数据
function updateTask(path: string, tasks: Task[]): void {
  try {
    fs.writeFile(path, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch(err) {
    console.log('Error: delette file error: ', err);
  }
}


//  创建任务应用
interface Task {
  id: number;
  name: string;
  note: string;
  checked: boolean;
}

class TaskApp {
  tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  showAllItems() {
    console.log('|ID|NAME   |NOTE                |CHECKED|');
    this.tasks.forEach((task: Task) => {
      console.log(`|${task.id.toString().padEnd(2, ' ')}|${task.name.padEnd(7, ' ')}|${task.note.padEnd(20, ' ')}|${task.checked ? '√'.padEnd(7, ' ') : '×'.padEnd(7, ' ')}|`);
    });
    console.log('|--|-------|--------------------|-------|');
  }

  addItem(name: string, note: string): void {
    const id: number = this.tasks.length;
    const checked = false;
    writeTask(taskPath, { id, name, note, checked });
  }

  deleteItem(id: number) {
    this.tasks.splice(id, 1);
    this.tasks.forEach((task: Task, index: number) => {
      task.id = index;
    });
    updateTask(taskPath, this.tasks);
    console.log('Delete Successfully. ');
  }

  checkItem(id: number): void {
    for (let i: number = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id !== id) continue;
      this.tasks[i].checked = !this.tasks[i].checked;
    }
    updateTask(taskPath, this.tasks);
    console.log('Check Successfully. ');
  }
}

// 创建shell指令
interface Options {
  show: boolean;
  add: boolean;
  del: boolean;
  check: boolean;
  n: string | undefined;
  N: string | undefined;
  i: number | undefined;
}

class CommandCreator {
  options: Options;

  constructor() {
    const program = new Command();

    program
      .option('--show', 'Enable show flag', false)
      .option('--add', 'Enable add flag', false)
      .option('--del', 'Enable del flag', false)
      .option('--check', 'Enable check flag', false)
      .option('-n <string>', 'Set option n', undefined)
      .option('-N <string>', 'Set option N', undefined)
      .option('-i <number>', 'Set option i', undefined);

    program.parse(process.argv);

    this.options = program.opts();
  }

  handleCommand(taskApp: TaskApp) {
    // validate long options number
    const validated: string | boolean = this._validateArgs();
    if (!validated) {
      console.error('Error: you can provide only one long option. ');
      process.exit(1);
    }

    // validate --add following short options
    if (this.options.add && (this.options.n === undefined || this.options.N === undefined)) {
      console.error('Error: name & note must be provided. ');
      process.exit(1);
    }

    // validate --del following short options
    if (this.options.del && this.options.i === undefined) {
      console.error('Error: task id must be provided. ');
      process.exit(1);
    }

    if (this.options.check && this.options.i === undefined) {
      console.error('Error: task id needed. ');
      process.exit(1);
    }

    // handle long options
    switch (validated) {
      case 'show':
        taskApp.showAllItems();
        break;
      case 'add':
        taskApp.addItem(this.options.n!, this.options.N!);
        break;
      case 'del':
        taskApp.deleteItem(this.options.i!);
        break;
      case 'check':
        taskApp.checkItem(Number(this.options.i!));
        break;

      default:
        console.log('HandleCommand default. ');
        break;
    }
  }

  _validateArgs(): string | boolean {
    let count: number = 0;
    let selected: string = '';

    Object.entries(this.options).forEach((option: [string, boolean | string])  => {
      if (typeof option[1] === 'boolean' && option[1] === true) {
        count ++;
        selected = option[0];
      }
    });

    return count === 1 ? selected : false;
  }
}
