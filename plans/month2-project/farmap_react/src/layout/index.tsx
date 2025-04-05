import { Outlet } from 'react-router';

function Layout() {
	return (
		<>
			<div>here is dashboard</div>

			<Outlet />
		</>
	);
}

export default Layout;
