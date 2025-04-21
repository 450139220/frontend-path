import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Follow(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Follow</div>
      <div>hello</div>
    </>
  );
}

export default Follow;
