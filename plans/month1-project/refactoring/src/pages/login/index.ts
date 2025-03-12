import Store from '../../utils/store';
import styles from './index.module.css';

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
		container.textContent = 'login';

		const btn = document.createElement('button');
		container.appendChild(btn);
		btn.textContent = 'LOGIN';
		btn.addEventListener('click', () => {
			const storeManager = Store.getInstance(null);
			storeManager?.setStore('isLoggedIn', 'true');
			storeManager?.setStore('auth', 'user');
			console.log('logged in!!');
		});

		return fragment;
	}
}
