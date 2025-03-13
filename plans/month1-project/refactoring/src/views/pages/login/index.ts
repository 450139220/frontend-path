import styles from './index.module.css';

export default class PageMap {
	body: DocumentFragment;

	constructor() {
		this.body = this.createBody();
	}

	private createBody() {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(styles.container);

		const button = document.createElement('button');
		container.appendChild(button);
		button.textContent = 'SUBMIT';

		return fragment;
	}
}
