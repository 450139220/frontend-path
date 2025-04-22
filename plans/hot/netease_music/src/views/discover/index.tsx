import { Link, Outlet } from 'react-router-dom';
import styles from './index.module.css';

// interface DiscoverProps {}

function Discover() {
  return (
    <>
      <div>
        <Link to="/discover">发泄</Link>
        <Link to="/discover/toplist">toplist</Link>
        <Link to="/discover/playlist">playlist</Link>
        <Link to="/discover/djradio">djradio</Link>
        <Link to="/discover/artist">artist</Link>
        <Link to="/discover/album">album</Link>
      </div>
      <div>hello</div>
      <Outlet />
    </>
  );
}

export default Discover;
