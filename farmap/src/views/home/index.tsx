import { useAppDispatch, useAppSelector } from '@/store';
import { signOut } from '@/store/modules/user';
import type { JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Home(props: IProps): JSX.Element {
  const username = useAppSelector((state) => state.user.userData.username);

  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <button onClick={handleSignOut}>sign out</button>
      <div>hello {username}</div>

      <div className="ml-10 text-blue-500">users list</div>
    </>
  );
}

export default Home;
