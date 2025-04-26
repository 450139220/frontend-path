import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Farm(props: IProps): JSX.Element {
  return (
    <>
      <div>Farm</div>
    </>
  );
}

export default Farm;
