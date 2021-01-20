export const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'THEME_CHANGE': {
      return {
        isLight: !state.isLight,
      };
    }

    default:
      return state;
  }
};
