import React, {
  createContext,
  useReducer,
  useMemo,
  Reducer,
  FC,
  useContext,
} from 'react';

import { reducer } from './auth.reducer';

const wistlistState = {
  user: null,
};
export const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, UserContextAction>>(
    reducer,
    wistlistState
  );
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = (): UserContextType | null => useContext(AuthContext);

export default AuthProvider;
