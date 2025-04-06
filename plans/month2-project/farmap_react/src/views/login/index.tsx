import { FormEvent, useState } from 'react';
import styles from './index.module.css';
import store, { login } from '@/store';

// logout
// store.dispatch(login({ token: '', username: '', role: '' }));
function Login() {
	const [loginError, setLogginError] = useState(false);
	const handleLogin = async (event: FormEvent) => {
		// FIXME: how to restrict the parameter of <store.dispatch>?
		event.preventDefault();
		// TODO: connect to backend
		const formData = new FormData(event.target as HTMLFormElement);
		const username = formData.get('username');
		const password = formData.get('password');
		if (username === 'admin' && password === '123') {
			store.dispatch(
				login({ token: '123123', username: 'admin1', role: 'admin' })
			);
		} else {
			setLogginError(true);
			setTimeout(() => {
				setLogginError(false);
			}, 3000);
		}
		// TODO: connetc to backend
	};

	return (
		<>
			<form onSubmit={handleLogin}>
				<div className="form-username">
					<label htmlFor="form-username__input">username</label>
					<input
						type="text"
						id="form-username__input"
						name="username"
						required
					/>
				</div>
				<div className="form-password">
					<label htmlFor="form-password__input">password</label>
					<input
						type="password"
						id="form-password__input"
						name="password"
						required
					/>
				</div>
				<button type="submit">login</button>
			</form>
			{loginError ? (
				<div className={styles['error-tip']}>
					username or passowrd not correct
				</div>
			) : null}
		</>
	);
}

export default Login;
