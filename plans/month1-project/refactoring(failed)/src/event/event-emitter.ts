type Listener = (...args: any[]) => void;
type Event = Record<string, Set<Listener>>;

class EventEmitter {
	#events: Event = {};

	on(event: string, listener: Listener) {
		(this.#events[event] ??= new Set()).add(listener);
	}

	emit(event: string, ...args: any[]) {
		this.#events[event]?.forEach((listener) => listener(...args));
	}

	off(event: string, listener: Listener) {
		this.#events[event]?.delete(listener);
	}
}

export const eventEmitter = new EventEmitter();
