import { FormEvent, useRef, useState } from 'react';
import styles from './index.module.css';
import store, { login } from '@/store';
import { baseUrl } from '@/constants';

// logout
// store.dispatch(login({ token: '', username: '', role: '' }));
function Login() {
	const [loginError, setLogginError] = useState(false);
	const timer = useRef<NodeJS.Timeout | undefined>(undefined);
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
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => {
				setLogginError(false);
			}, 3000);
		}
		// TODO: connetc to backend
	};

	return (
		<>
			<img
				className={styles.background}
				src={`${baseUrl}/images/login_background.png`}
				alt="/background"
			/>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img width="150" src={`${baseUrl}/icons/logo.png`} alt="logo" />
					<div className={styles['logo-text']}>
						智慧农业<span>FarMap</span>
					</div>
				</div>
				<form onSubmit={handleLogin}>
					<div className={styles['form-data']}>
						<input
							type="text"
							maxLength={20}
							id="form-username__input"
							name="username"
							required
						/>
						<label htmlFor="form-username__input">
							<i className={`ri-at-line ${styles['form-data__icon']}`}></i>
							<span>用户名</span>
						</label>
					</div>
					<div className={styles['form-data']}>
						<input
							type="password"
							maxLength={20}
							id="form-password__input"
							name="password"
							required
						/>
						<label htmlFor="form-password__input">
							<i className={`ri-key-2-line ${styles['form-data__icon']}`}></i>
							<span>密码</span>
						</label>
					</div>
					<button className={styles['form-button']} type="submit">
						登录
					</button>
					{loginError ? (
						<div className={styles['error-tip']}>
							用户名或密码错误，请重试！
						</div>
					) : null}
				</form>
			</div>
		</>
	);
}

export default Login;
