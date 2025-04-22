import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Recommend(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Recommend</div>
      <div>hello</div>
    </>
  );
}

export default Recommend;
