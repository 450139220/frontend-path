import styles from './index.module.css';
import { store } from '../../../store';
import Beian from '../../components/beian';

export default class PageLogin {
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
		button.addEventListener('click', () => {
			store.dispatch('isLoggedIn', 'true');
		});

		// component beian
		const beian = new Beian();
		container.appendChild(beian.body);

		return fragment;
	}
}
