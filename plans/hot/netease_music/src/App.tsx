import styles from './App.module.css';
import { Link } from 'react-router';
import Router from '@/router';
import { Suspense } from 'react';
// import { useAppSelector, shallowEqual } from '@/store';

function App() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles['header-logo']}>
          <a href="#">网易云音乐</a>
        </h1>
        <nav className={styles['header-nav']}>
          <Link to="/discover">发现音乐</Link>
          <Link to="/my">我的音乐</Link>
          <Link to="/follow">关注</Link>
          <a href="#">音乐人</a>
          <a href="#">商城</a>
          <a href="#">云推歌</a>
          <Link to="/download">下载客户端</Link>
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
      <Suspense fallback="">
        <Router />
      </Suspense>
    </>
  );
}

export default App;
