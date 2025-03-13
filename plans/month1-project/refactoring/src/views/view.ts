import { eventEmitter } from '../event/event-emitter';
import { EVENTS } from '../event/event-names';

class View {
	#pages: DocumentFragment[] = [];
	#components: DocumentFragment[] = [];

	constructor() {
		eventEmitter.on(EVENTS.RENDER, this.#render.bind(this));
	}

	#render(path: string) {
		console.log(path);
	}
}

export const view = new View();
