import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function My(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>My</div>
      <div>hello</div>
    </>
  );
}

export default My;
