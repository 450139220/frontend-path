// use this to manage <events> & <components> if the structure becomes difficulte

type Listener = (...args: unknown[]) => void;
type Events = Map<string, Set<Listener>>;

class EventBus {
	private events: Events = new Map();

	// register event & relative event listener
	on(event: string, listener: Listener) {
		const res: Set<Listener> = this.events.get(event) ?? new Set<Listener>();
		res.add(listener);
		this.events.set(event, res);
	}

	// publish(trigger) event
	emit(event: string, ...args: unknown[]) {
		const res: Set<Listener> | undefined = this.events.get(event);
		if (!res) {
			throw new Error(`[EVENTBUS] no such event '${event}'`);
		}
		res.forEach((listener: Listener) => {
			listener(...args);
		});
	}
}

export const eventbus = new EventBus();
