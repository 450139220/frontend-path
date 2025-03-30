import { eventEmitter } from '../event/event-emitter';
import { EVENTS } from '../event/event-names';
import { State, states } from './states';

class Store {
	#states: State = {};

	constructor(states: State) {
		this.#states = states;

		// save states to session storage
		for (let [state, value] of Object.entries(this.#states)) {
			const result: boolean = this.#initStorage(state, value);
			if (result) {
				console.log(`Initiate state <${state}>`);
			}
		}

		// initiate log status and publish an event after router build listener
		const logState = sessionStorage.getItem('isLoggedIn') as string;
		// router logic is that if logStateChange event does not changed value, listener would do nothing
		eventEmitter.emit(EVENTS.LOGIN, {
			oldValue: !logState, // so here use !logState to let router handle event when refresh web
			newValue: logState,
		});
	}

	#initStorage(state: string, value: string): boolean {
		const item = sessionStorage.getItem(state);
		if (item) return false;
		sessionStorage.setItem(state, value);
		return true;
	}

	getState(state: string): string {
		const item = sessionStorage.getItem(state);
		return item ? item : 'none';
	}

	dispatch(state: string, value: string): boolean {
		const item = sessionStorage.getItem(state);
		if (!item) return false;
		sessionStorage.setItem(state, value);

		// emit log status to router
		if (state === 'isLoggedIn') {
			eventEmitter.emit(EVENTS.LOGIN, { oldValue: item, newValue: value });
		}

		return true;
	}
}

export const store = new Store(states);
