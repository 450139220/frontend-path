import { JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UserState } from '@/store';
import {
	Routes,
	Route,
	Navigate,
	useLocation,
	useNavigate,
} from 'react-router';
import Login from '@/views/login';
import Layout from '@/layout';
import { routes } from './routes';

function RouteGuard({ children }: { children: JSX.Element }) {
	// validate if is logged in, navigate to <Login> if not
	const token = useSelector((state: UserState) => state.token);
	const isLoggedIn = token?.length === 0 ? false : true;
	// when logged in, navigate to <Home> when pathname is </login>
	const location = useLocation();
	const navigate = useNavigate();

	// do when login event triggered
	useEffect(() => {
		if (isLoggedIn && location.pathname === '/login') {
			navigate('/', { replace: true });
		}
	}, [isLoggedIn, location, navigate]);

	// <location.pathname !== '/login'> is to avoid loop call of <RouteGuard>
	if (!isLoggedIn && location.pathname !== '/login')
		return <Navigate to="/login" replace />;
	if (isLoggedIn && location.pathname === '/login')
		return <Navigate to="/" replace />;
	return children;
}

function Router() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<RouteGuard>
						<Login />
					</RouteGuard>
				}
			/>
			<Route path="/" element={<Layout />}>
				{routes.map((route, index) => (
					<Route
						index={index === 0}
						path={route.path}
						element={
							<RouteGuard>
								<route.component />
							</RouteGuard>
						}
					/>
				))}
			</Route>
			{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
		</Routes>
	);
}

export default Router;
