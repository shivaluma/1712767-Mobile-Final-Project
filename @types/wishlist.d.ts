type WishListState = {
  wishlish: Course[];
};

type WishListActionType = 'WISHLIST_ADD' | 'WISHLIST_REMOVE';

type WishListContextActionType = {
  type: WishListActionType;
  payload: {
    course?: Course;
  };
};

type WishListContextType = {
  state: WishListState;
  dispatch: (action: WishListContextActionType) => void;
};
