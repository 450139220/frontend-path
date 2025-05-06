import { createContext, useContext } from "react";

export interface UserState {
  token: string;
  name: string;
  role: string;
}

export interface UserAction {
  type: string;
  payload: UserState;
}

export const UserContext = createContext<UserState | null>(null);
export const UserDispatchContext =
  createContext<React.Dispatch<UserAction> | null>(null);

export function useUserContext() {
  return useContext(UserContext);
}
export function useUserDispatchContext() {
  return useContext(UserDispatchContext);
}
