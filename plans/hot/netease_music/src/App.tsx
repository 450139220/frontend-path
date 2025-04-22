import styles from './App.module.css';
import { Link } from 'react-router';
import Router from '@/router';
import { Suspense } from 'react';
import { useAppSelector, shallowEqual } from '@/store';

function App() {
  const count = useAppSelector((state) => state.counter.count, shallowEqual);

  return (
    <>
      <div className={styles.header}>
        <nav>
          <Link to="/discover">发现音乐</Link>
          <Link to="/my">我的音乐</Link>
          <Link to="/follow">关注</Link>
          <a href="/#">音乐人</a>
          <a href="/#">商城</a>
          <a href="/#">云推歌</a>
          <Link to="/download">下载客户端</Link>
        </nav>
      </div>
      <Suspense fallback="">
        <Router />
      </Suspense>
    </>
  );
}

export default App;
