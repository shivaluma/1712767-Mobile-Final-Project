import React, {
  createContext,
  useReducer,
  useMemo,
  Reducer,
  FC,
  useContext,
} from 'react';

import { reducer } from './theme.reducer';

const initialState = {
  isLight: true,
};
export const ThemeContext = createContext<any>(null);

export const ThemeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    reducer,
    initialState
  );
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeValue = (): any => useContext(ThemeContext);

export default ThemeContext;
