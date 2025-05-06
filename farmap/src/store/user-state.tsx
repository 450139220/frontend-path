import { useReducer, type ReactNode } from "react";
import type { UserState, UserAction } from "./user-context";
import { UserContext, UserDispatchContext } from "./user-context";

export default function UserStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, dispatch] = useReducer(reduser, initialState);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

const initialState: UserState = {
  token: "",
  name: "",
  role: "",
};

function reduser(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "signin":
      return action.payload;
    case "signout":
      return {
        token: "",
        name: "",
        role: "",
      };

    default:
      throw new Error(`Unknown User Action Type: ${action.type}`);
  }
}
