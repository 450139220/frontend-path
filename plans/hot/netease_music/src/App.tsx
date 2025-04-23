import styles from './App.module.css';
import { NavLink } from 'react-router';
import Router from '@/router';
import { Suspense } from 'react';
import { NavRoute, navRoutes } from '@/router/routes';
// import { useAppSelector, shallowEqual } from '@/store';

function App() {
  const validNav = (navRoute: NavRoute, index: number) => {
    if (navRoute.isLink) {
      return (
        <NavLink
          className={styles['header-nav__btn']}
          to={navRoute.to}
          key={index}
        >
          {navRoute.name}
          <i className={styles['header-nav__arr']}></i>
        </NavLink>
      );
    }
    return (
      <a href={navRoute.to} target="_blank" key={index}>
        {navRoute.name}
      </a>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles['header-logo']}>
          <a href="#">网易云音乐</a>
        </h1>
        <nav className={styles['header-nav']}>
          {navRoutes.map((route, index) => validNav(route, index))}
        </nav>
        <div className={styles['srch-container']}>
          <i className="ri-search-2-line"></i>
          <input
            type="text"
            name="srch"
            id="srch"
            placeholder="音乐/视频/电台/用户"
          />
        </div>
        <div className={styles.creator}>
          <span>创作者中心</span>
        </div>
        <div className={styles['login-container']}>
          <span className={styles['login-btn']}>登录</span>
          <div className={styles['login-line']}>
            <div className={styles['login-line__line']}></div>
            <div className={styles['login-line__arr']}></div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <Suspense fallback="">
        <Router />
      </Suspense>
    </>
  );
}

export default App;
