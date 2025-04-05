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

function handleLogin() {
	// TODO: make login logic
	store.dispatch(login());
}

export default Login;
