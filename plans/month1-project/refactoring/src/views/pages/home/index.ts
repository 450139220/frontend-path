import styles from './index.module.css';

export default class PageHome {
	body: DocumentFragment;

	constructor() {
		this.body = this.createBody();
	}

	private createBody() {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(styles.container);

		const a = document.createElement('div');
		container.appendChild(a);
		a.textContent = 'HOME';

		return fragment;
	}
}
