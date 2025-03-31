import { NavLink, Outlet } from 'react-router-dom';
import styles from './index.module.css';

const Layout = () => {
	return (
		<div className={styles.container}>
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
				home
			</NavLink>

			<NavLink
				to="/dashboard"
				className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
				dashborad
			</NavLink>
			<Outlet />
		</div>
	);
};

export default Layout;
