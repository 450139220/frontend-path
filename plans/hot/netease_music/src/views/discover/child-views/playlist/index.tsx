import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Playlist(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Playlist</div>
      <div>hello</div>
    </>
  );
}

export default Playlist;
