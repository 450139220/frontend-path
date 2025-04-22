import styles from './index.module.css';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Djradio(props: IProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>Djradio</div>
      <div>hello</div>
    </>
  );
}

export default Djradio;
