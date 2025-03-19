import styles from './index.module.css';
import { Route, routes } from '../../../router/routes';
import { router } from '../../../router';
import { store } from '../../../store';

// router & navbar is
export default class Navbar {
	body: DocumentFragment;
	#routes: Route[] = [];

	constructor() {
		// bind routes to navbar elements
		this.#routes = routes.filter((route) => route.path !== '/login');

		this.body = this.#createBody();
	}

	#createBody() {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(styles.container);

		// create <a> element to navigation feature
		for (let route of this.#routes) {
			// create & append
			const a = document.createElement('a');
			container.appendChild(a);

			// view
			a.textContent = route.name;

			// feature
			a.href = route.path;
			a.dataset.link = '';
		}

		container.addEventListener('click', (event) => {
			const target = event.target as HTMLAnchorElement;

			if (target.tagName === 'A' && target.hasAttribute('data-link')) {
				event.preventDefault();

				// push path to router for rendering
				const path: string | null = target.getAttribute('href');
				if (path && path !== window.location.pathname) {
					router.push(path);
				}
			}
		});

		// quit element
		const button = document.createElement('button');
		container.appendChild(button);
		button.textContent = 'QUIT';
		button.addEventListener('click', () => {
			store.dispatch('isLoggedIn', 'false');
		});

		return fragment;
	}
}
