type SnackbarState = {
  show?: boolean;
  content?: string;
  duration?: number;
};

type SnackBarActionType = 'SNACKBAR_CHANGE';

type SnackBarContextActionType = {
  type: SnackBarActionType;
  payload: SnackbarState;
};

type SnackBarContextType = {
  state: SnackbarState;
  dispatch: (action: SnackBarContextActionType) => void;
};
