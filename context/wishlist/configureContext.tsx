import React, {
  createContext,
  useReducer,
  useMemo,
  Reducer,
  FC,
  useContext,
} from 'react';

import { reducer } from './wishlist.reducer';

const wistlistState = {
  wishlish: [],
};
export const WishListContext = createContext<WishListContextType | null>(null);

export const WishListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    Reducer<WishListState, WishListContextActionType>
  >(reducer, wistlistState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = (): WishListContextType | null =>
  useContext(WishListContext);

export default WishListProvider;
