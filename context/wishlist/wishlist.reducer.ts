export const reducer = (
  state: WishListState,
  action: WishListContextActionType
): WishListState => {
  switch (action.type) {
    case 'WISHLIST_ADD': {
      return {
        ...state,
        wishlish: [...state.wishlish, action.payload.course!],
      };
    }

    case 'WISHLIST_REMOVE': {
      return {
        ...state,
        wishlish: state.wishlish.filter(
          (wl) => wl.id !== action.payload.course?.id
        ),
      };
    }

    default:
      return state;
  }
};
