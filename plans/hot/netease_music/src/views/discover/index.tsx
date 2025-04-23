import { NavLink, Outlet } from 'react-router-dom';
import styles from './index.module.css';

interface DiscoverRoute {
  to: string;
  name: string;
}

const discoverRoutes: DiscoverRoute[] = [
  {
    to: '/discover',
    name: '推荐',
  },
  {
    to: '/discover/toplist',
    name: '排行榜',
  },
  {
    to: '/discover/playlist',
    name: '歌单',
  },
  {
    to: '/discover/djradio',
    name: '博客有声书',
  },
  {
    to: '/discover/artist',
    name: '歌手',
  },
  {
    to: '/discover/album',
    name: '新碟上架',
  },
];

function Discover() {
  return (
    <>
      <div className={styles.header}>
        {discoverRoutes.map((route, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles['header-link__active'] : styles['header-link']
            }
            end
            to={route.to}
            key={index}
          >
            {route.name}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Discover;
