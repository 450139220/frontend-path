import styles from './index.module.css';
import { NavLink, Outlet } from 'react-router';
import { routes } from '@/router/routes';
import store, { logout } from '@/store';
import { baseUrl } from '@/constants';

function Layout() {
	const handleLogout = () => {
		store.dispatch(logout());
	};

	return (
		<>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<div>
						<div className={styles.logo}>
							<img width="35" src={`${baseUrl}/icons/logo.png`} alt="logo" />
							<span>智慧农业FarMap</span>
						</div>
						{routes.map((route, index) => (
							<div className={styles['nav__single']} key={index}>
								<NavLink
									className={({ isActive }) =>
										isActive
											? `${styles.navlink} ${styles.active}`
											: styles.navlink
									}
									to={route.path}
									end>
									<i className={`ri-${route.icon}-fill`}></i>
									{route.name}
								</NavLink>
							</div>
						))}
					</div>
					<div className={styles['nav__single']}>
						<div
							className={`${styles.navlink} ${styles.logout}`}
							onClick={handleLogout}>
							<i className="ri-logout-box-r-line"></i>
							退出登录
						</div>
					</div>
				</nav>
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
