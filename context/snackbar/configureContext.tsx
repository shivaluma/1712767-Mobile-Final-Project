import React, {
  createContext,
  useReducer,
  useMemo,
  Reducer,
  FC,
  useContext,
} from 'react';

import { reducer } from './snackbar.reducer';

const initialState = {
  show: false,
  content: '',
  duration: 2000,
};
export const SnackbarContext = createContext<SnackBarContextType | null>(null);

export const SnackbarProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    Reducer<SnackbarState, SnackBarContextActionType>
  >(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackBarContextType | null =>
  useContext(SnackbarContext);

export default SnackbarContext;
