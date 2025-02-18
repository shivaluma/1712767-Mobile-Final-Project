export const reducer = (
  state: AuthState,
  action: UserContextAction
): AuthState => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        user: action.payload.user,
        hasInit: true,
      };
    }

    case 'REMOVE_USER': {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};
