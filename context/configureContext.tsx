import React, {
  createContext,
  useReducer,
  useMemo,
  Reducer,
  FC,
  useContext,
} from 'react';

import { reducer } from './reducers/authReducer';

const initialState = {
  user: null,
  wishlish: [],
};
export const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, UserContextAction>>(
    reducer,
    initialState
  );
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = (): UserContextType | null => useContext(AuthContext);

export default AuthProvider;
