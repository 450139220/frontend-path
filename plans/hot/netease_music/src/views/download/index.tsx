import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Download(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Download</div>
      <div>hello</div>
    </>
  );
}

export default Download;
