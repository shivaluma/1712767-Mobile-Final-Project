interface AuthenticationForm {
  username: string;
  password: string;
  confirmPassword?: string;
}

interface User {
  id: string;
  email?: string;
  avatar?: string;
  name: string;
  favoriteCategories: string[];
  phone?: string;
  type?: string;
  isDeleted?: boolean;
  isActivated?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type AuthState = {
  user: User | null;
  wishlish: Course[];
};

type ActionType =
  | 'UPDATE_USER'
  | 'REMOVE_USER'
  | 'WISHLIST_ADD'
  | 'WISHLIST_REMOVE';

type UserContextAction = {
  type: ActionType;
  payload: {
    user: User | null;
    course?: Course;
  };
};

type UserContextType = {
  state: AuthState;
  dispatch: (action: Actions) => void;
};
