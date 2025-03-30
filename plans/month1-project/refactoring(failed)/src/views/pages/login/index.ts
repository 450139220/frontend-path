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

		// left part
		container.appendChild(this.#createLeft());

		// right part
		container.appendChild(this.#createRight());

		return fragment;
	}

	#createLeft() {
		const fragment = document.createDocumentFragment();

		const left = document.createElement('div');
		fragment.appendChild(left);
		left.classList.add(styles['left-container']);

		// top => name & logo
		const top = document.createElement('div');
		left.appendChild(top);
		top.classList.add(styles['top']);

		const appName = document.createElement('div');
		top.appendChild(appName);
		appName.classList.add(styles['name']);
		appName.textContent = 'Farm-Use';

		// logo element
		const logo = document.createElement('img');
		top.appendChild(logo);
		logo.classList.add(styles['logo']);
		this.#fetchLogo().then((url) => {
			logo.src = url;
		});
		logo.alt = 'Logo';

		// bottom => login infos
		const bottom = document.createElement('div');
		left.appendChild(bottom);
		bottom.classList.add(styles['bottom']);

		// tip
		const signup = document.createElement('div');
		bottom.appendChild(signup);
		signup.classList.add(styles['tip']);
		signup.textContent = '请登录:';

		// form element
		const form = document.createElement('form');
		bottom.appendChild(form);
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
		bottom.appendChild(beian.body);

		return fragment;
	}

	#createRight() {
		const fragment = document.createDocumentFragment();

		const right = document.createElement('div');
		fragment.appendChild(right);
		right.classList.add(styles['right-container']);

		// text
		const text = document.createElement('div');
		right.appendChild(text);
		text.classList.add(styles['text']);

		const sentence = "Let's turn Farm-Use on!";
		const splited = sentence.split('Farm-Use');

		text.append(splited[0]);

		const name = document.createElement('span');
		text.appendChild(name);
		name.classList.add(styles['name']);
		name.textContent = 'Farm-Use';

		text.append(splited[1]);

		// background
		const bg = document.createElement('img');
		right.appendChild(bg);
		bg.classList.add(styles['background']);
		bg.alt = 'background';
		this.#fetchBackground().then((url) => (bg.src = url));

		return fragment;
	}

	async #fetchLogo(): Promise<string> {
		const res = await fetch('/public/icons/logo.png');
		const blob = await res.blob();
		return URL.createObjectURL(blob);
	}

	async #fetchBackground(): Promise<string> {
		const res = await fetch('/public/images/login-background.png');
		const blob = await res.blob();
		return URL.createObjectURL(blob);
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

	async #handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const username = (document.getElementById('username') as HTMLInputElement)
			.value;
		const password = (document.getElementById('password') as HTMLInputElement)
			.value;
		console.log(username, password);

		// send request
		const res = await fetch('http://localhost:5173/public/login.json');
		const loginInfo = await res.json();

		// TODO: 这里需要判断
		// logged in
		store.dispatch('isLoggedIn', 'true');
		store.dispatch('auth', loginInfo.auth);
	}
}
