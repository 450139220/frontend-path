import { useDispatch } from 'react-redux';
import { store, setUserState } from '@/store';
import styles from './index.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

for (const [key, value] of Object.entries(store.getState())) {
	if (key === 'token') continue;
	console.log(`Current state ${key}: ${value}`);
}

const Login = () => {
	/* ??? what to use */
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	console.log(123);
	// }, [dispatch]);

	/* navigate manually like <router.push('/path')> */
	// const navigate = useNavigate();
	// setTimeout(() => {
	// 	navigate('/');
	// }, 1000);

	return <div className={styles.login}>Login</div>;
};

export default Login;
