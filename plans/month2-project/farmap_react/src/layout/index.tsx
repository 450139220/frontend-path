import styles from './index.module.css';
import { NavLink, Outlet } from 'react-router';
import { routes } from '@/router/routes';

function Layout() {
	return (
		<>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<div>
						<div className={styles.logo}>
							<img src="/" alt="logo" />
							<span>智慧农业FarMap</span>
						</div>
						{routes.map((route, index) => (
							<NavLink
								className={({ isActive }) =>
									isActive
										? `${styles.navlink} ${styles.active}`
										: styles.navlink
								}
								to={route.path}
								key={index}
								end>
								<i className={`ri-${route.icon}-fill`}></i>
								{route.name}
							</NavLink>
						))}
					</div>
					<div className={`${styles.navlink} ${styles.logout}`}>
						<i className="ri-logout-box-r-line"></i>
						退出登录
					</div>
				</nav>
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
