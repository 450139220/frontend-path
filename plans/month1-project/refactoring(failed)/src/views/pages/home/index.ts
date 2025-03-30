import styles from './index.module.css';
import Navbar from '../../components/navbar';

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

		// component navbar
		const navbar = new Navbar();
		container.appendChild(navbar.body);

		const a = document.createElement('div');
		container.appendChild(a);
		a.textContent = 'HOME';

		return fragment;
	}
}
