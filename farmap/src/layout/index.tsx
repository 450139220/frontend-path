import type { JSX, ReactNode } from 'react';
import { Outlet } from 'react-router';

interface IProps {
  children?: ReactNode;
}

function Layout(props: IProps): JSX.Element {
  return (
    <>
      <div>Layout</div>
      <Outlet />
    </>
  );
}

export default Layout;
