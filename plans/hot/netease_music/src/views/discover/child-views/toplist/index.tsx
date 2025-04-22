import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Toplist(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Toplist</div>
      <div>hello</div>
    </>
  );
}

export default Toplist;
