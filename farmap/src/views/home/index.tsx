import type { JSX, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export default function Home(props: IProps): JSX.Element {
  return (
    <>
      <div>Home</div>
    </>
  );
}
