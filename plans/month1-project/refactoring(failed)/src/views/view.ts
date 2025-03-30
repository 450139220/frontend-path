import { eventEmitter } from '../event/event-emitter';
import { EVENTS } from '../event/event-names';

class View {
	#app: HTMLDivElement;

	constructor() {
		// get app element
		this.#app = document.getElementById('app') as HTMLDivElement;

		eventEmitter.on(EVENTS.RENDER, this.#render.bind(this));
	}

	#render(routeComponent: () => Promise<any>) {
		// remove all unrelative components
		for (let child of this.#app.children) {
			child.remove();
		}

		// parse view modules then render page comtent
		const component = routeComponent();
		component.then((module) => {
			const pageInstance = new module.default();
			this.#app.appendChild(pageInstance.body);
		});
	}
}

export const view = new View();
