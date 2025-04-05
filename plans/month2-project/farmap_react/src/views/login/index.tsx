import store from '@/store';
import { login } from '../../store';

function Login() {
	return (
		<>
			<div>LoginPage</div>
			{<button onClick={handleLogin}>login</button>}
		</>
	);
}

async function handleLogin() {
	// TODO: how to restrict the parameter of <store.dispatch>?
	store.dispatch(login({ token: '123123', username: '123', role: 'ad' }));
	// logout
	// store.dispatch(login({ token: '', username: '', role: '' }));
}

export default Login;
