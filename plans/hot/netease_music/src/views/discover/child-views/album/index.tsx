import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Album(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Album</div>
      <div>hello</div>
    </>
  );
}

export default Album;
