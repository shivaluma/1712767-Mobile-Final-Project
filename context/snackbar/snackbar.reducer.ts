export const reducer = (
  state: SnackbarState,
  action: SnackBarContextActionType
): SnackbarState => {
  switch (action.type) {
    case 'SNACKBAR_CHANGE': {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
