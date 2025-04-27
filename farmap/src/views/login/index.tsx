import { useAppDispatch } from '@/store';
import { signIn } from '@/store/modules/user';
import type { FormEvent, JSX, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Login(props: IProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      signIn({
        token: 'asdfasd',
        userData: { username: '2username', role: 'asf' },
      }),
    );
  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="请输入..."
            required
          />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="请输入..."
            required
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </>
  );
}

export default Login;
