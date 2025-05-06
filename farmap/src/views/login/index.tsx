import type { JSX, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export default function Login(props: IProps): JSX.Element {
  return (
    <>
      <div>Login</div>
    </>
  );
}
