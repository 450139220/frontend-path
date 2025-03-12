import Store from './store';

export interface Route {
	path: string;
	name: string;
	component(): Promise<any>;
}

export default class Router {
	routes: Route[] = [];

	constructor(routes: Route[]) {
		this.routes = routes;
	}

	init() {
		window.addEventListener('popstate', (e) => {
			this.push(e.state.path);
		});

		// redirect to login page if not logged in
		const path: string = window.location.pathname; // get current path
		const hasPath: boolean = this.routes.some((route) => route.path === path); // validate path

		const storeManager = Store.getInstance(null);
		const isLoggedIn = storeManager?.getStore('isLoggedIn');
		const renderPath =
			isLoggedIn !== 'true' ? '/login' : hasPath ? path : '/notFound'; // validate which page to render
		this.push(renderPath);

		// handle click event to navigate with each anchor element
		document.querySelectorAll('a[data-link]').forEach((anchor) => {
			anchor.addEventListener('click', (e) => {
				const target = e.target as HTMLElement;
				if (target.tagName === 'A') {
					e.preventDefault();
					const path = target.getAttribute('href') as string;
					const hasPath: boolean = this.routes.some(
						(route) => route.path === path
					);
					if (hasPath) {
						this.push(path);
					}
				}
			});
		});
	}

	private push(path: string) {
		history.pushState({ path }, '', path);
		this.render(path);
	}

	private render(path: string) {
		const app = document.getElementById('app') as HTMLDivElement;
		const page = this.routes.find((route) => route.path === path);
		page?.component().then((module) => {
			const pageContent = new module.default();
			app.appendChild(pageContent.body);
		});
	}
}
