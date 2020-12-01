export const reducer = (
  state: AuthState,
  action: UserContextAction
): AuthState => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return { ...state, user: action.payload.user };
    }
    case 'REMOVE_USER': {
      return { ...state, user: null };
    }

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
