import { describe, beforeEach, it, vi, expect } from 'vitest';
import reducer, { signIn, signOut } from '../modules/user';

describe('auth reducer', () => {
  // mock localStorage
  beforeEach(() => {
    Storage.prototype.setItem = vi.fn();
  });

  it('signIn 应该更新状态并写 localStorage', () => {
    const initialState = { token: '', userData: {} };
    const payload = {
      token: 'token123',
      userData: { username: '小明', role: 'admin' },
    };

    const state = reducer(initialState, signIn(payload));

    expect(state.token).toBe('token123');
    expect(state.userData).toEqual({ username: '小明', role: 'admin' });

    // 验证 localStorage.setItem 被正确调用
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token123');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify({ username: '小明', role: 'admin' }),
    );
  });

  it('signOut 应该清空状态并写空 localStorage', () => {
    const initialState = {
      token: 'token123',
      userData: { username: '小明', role: 'admin' },
    };

    const state = reducer(initialState, signOut());

    expect(state.token).toBe('');
    expect(state.userData).toEqual({});

    expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
    expect(localStorage.setItem).toHaveBeenCalledWith('userData', '{}');
  });
});
