import styles from './index.module.css';
import { NavLink, Outlet } from 'react-router';
import { routes } from '@/router/routes';

function Layout() {
	return (
		<>
			<div className="container">
				<nav className="sidebar">
					{routes.map((route, index) => (
						<NavLink
							className={({ isActive }) =>
								isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
							}
							key={index}
							to={route.path}
							end>
							{route.name}
						</NavLink>
					))}
				</nav>
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
