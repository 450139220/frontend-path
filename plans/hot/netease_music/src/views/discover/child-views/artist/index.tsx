import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Artist(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Artist</div>
      <div>hello</div>
    </>
  );
}

export default Artist;
