import { useAppDispatch } from '@/store';
import { signOut } from '@/store/modules/user';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Home(props: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <button onClick={handleSignOut}>sign out</button>
    </>
  );
}

export default Home;
