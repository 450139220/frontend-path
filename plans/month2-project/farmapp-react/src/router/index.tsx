import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, UserState } from '@/store';
import { JSX, useEffect } from 'react';

import Login from '@/views/login';
import Home from '@/views/home';
import Dashboard from '@/views/dashboard';
import Layout from '@/layout/index.';

const RouteGuard = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.pathname);

	const token = useSelector((state: UserState) => state.token);

	useEffect(() => {
		if (token.length <= 0) {
			navigate('/login');
		}
	}, [token, navigate]);

	if (token.length <= 0) return null;

	return children;
};

// TODO: 1
const Router = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<RouteGuard>
									<Home />
								</RouteGuard>
							}></Route>
						<Route
							path="dashboard"
							element={
								<RouteGuard>
									<Dashboard />
								</RouteGuard>
							}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default Router;
