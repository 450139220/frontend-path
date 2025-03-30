import { eventEmitter } from '../event/event-emitter';
import { EVENTS } from '../event/event-names';
import { Route, routes } from './routes';

class Router {
	#routes: Route[] = [];

	constructor(routes: Route[]) {
		this.#routes = routes;

		// handle popstate event
		window.addEventListener('popstate', this.#popstateHandler.bind(this));

		// bind router-link with route, listen click event
		// this.#bindAnchorElement();

		// listen log state change event
		eventEmitter.on(EVENTS.LOGIN, this.#logStateHandler.bind(this));
	}

	#popstateHandler() {
		window.addEventListener('popstate', () => {
			const path = window.location.pathname;
			this.push(path);
		});
	}

	// bind <a> element to navigation feature, already implemented in navbar component which may be better?
	// #bindAnchorElement() {}

	#logStateHandler({
		oldValue,
		newValue,
	}: {
		oldValue: string;
		newValue: string;
	}) {
		// validate if log status changed
		if (oldValue === newValue) return;

		// validate if is logged in
		if (newValue === 'false') {
			this.push('/login');
		} else {
			// validate if path is valid
			const path = window.location.pathname;
			const hasPath: boolean = this.#routes.some(
				(route) => route.path === path
			);
			if (hasPath && path !== '/login') {
				this.push(path);
			} else {
				this.push('/');
			}
		}
	}

	push(path: string) {
		history.pushState({}, '', path);
		this.#render(path);
	}

	#render(path: string) {
		const currentRoute = this.#routes.find(
			(route) => route.path === path
		) as Route;

		// pass route components & log status to view, no matter refresh web or login/logout
		eventEmitter.emit(EVENTS.RENDER, currentRoute.component);
	}
}

export const router = new Router(routes);
