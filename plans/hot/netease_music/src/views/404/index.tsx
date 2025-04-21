import styles from './index.module.css';

import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function NotFound(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>404 Not Found</div>

      <div>hello</div>
    </>
  );
}

export default NotFound;
