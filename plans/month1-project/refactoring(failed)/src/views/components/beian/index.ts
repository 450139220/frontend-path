import styles from './index.module.css';

export default class Beian {
	body: DocumentFragment;

	constructor() {
		this.body = this.#createBody();
	}

	#createBody(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(styles.container);

		const icp = document.createElement('div');
		container.appendChild(icp);
		// icp.classList.add(styles.icp);
		icp.textContent = 'ICP Beian Infos';

		const cop = document.createElement('div');
		container.appendChild(cop);
		cop.textContent = 'Cop Beian infos';

		const copyright = document.createElement('div');
		container.appendChild(copyright);
		copyright.textContent = 'Copyright©️';

		return fragment;
	}
}
