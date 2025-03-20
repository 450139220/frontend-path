import styles from './index.module.css';
import { store } from '../../../store';
import Beian from '../../components/beian';

export default class PageLogin {
	body: DocumentFragment;

	constructor() {
		this.body = this.#createBody();
	}

	#createBody() {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(styles.container);

		// form element
		const form = document.createElement('form');
		container.appendChild(form);
		form.classList.add(styles['login-form']);
		// handle submit event
		form.addEventListener('submit', this.#handleSubmit.bind(this));

		// form element => input elements
		const inputUsername = this.#createInput({
			id: 'username',
			text: '用户名',
			className: styles['login-input'],
			isPwd: false,
		});
		form.appendChild(inputUsername);

		const inputPwd = this.#createInput({
			id: 'password',
			text: '密码',
			className: styles['login-input'],
			isPwd: true,
		});
		form.appendChild(inputPwd);

		// form element => submit button
		const submitButton = document.createElement('button');
		form.appendChild(submitButton);
		submitButton.type = 'submit';
		submitButton.classList.add(styles['login-submit']);
		submitButton.textContent = '登录';

		// component beian
		const beian = new Beian();
		container.appendChild(beian.body);

		return fragment;
	}

	#createInput({
		id,
		text,
		className,
		isPwd,
	}: {
		id: string;
		text: string;
		className: string;
		isPwd: boolean;
	}): DocumentFragment {
		const fragment = document.createDocumentFragment();

		const container = document.createElement('div');
		fragment.appendChild(container);
		container.classList.add(className);

		const label = document.createElement('label');
		container.appendChild(label);
		label.setAttribute('for', id);
		label.textContent = text;

		const input = document.createElement('input');
		container.appendChild(input);
		if (isPwd) {
			input.type = 'password';
		} else {
			input.type = 'text';
		}
		input.id = id;
		input.name = text;
		// input.setAttribute('required', true)
		input.required = true;

		return fragment;
	}

	#handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const username = (document.getElementById('username') as HTMLInputElement)
			.value;
		const password = (document.getElementById('password') as HTMLInputElement)
			.value;
		console.log(username, password);
	}
}
