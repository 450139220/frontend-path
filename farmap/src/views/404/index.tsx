import type { JSX, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export default function NotFound(props: IProps): JSX.Element {
  return (
    <>
      <div>NotFound</div>
    </>
  );
}
