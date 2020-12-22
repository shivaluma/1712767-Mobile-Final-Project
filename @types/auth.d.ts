interface Authentication {
  email: string;
  password: string;
}

interface AuthenticationForm {
  username: string;
  password: string;
  phone?: string;
  email?: string;
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
};

type ActionType = 'UPDATE_USER' | 'REMOVE_USER';

type UserContextAction = {
  type: ActionType;
  payload: {
    user: User | null;
  };
};

type UserContextType = {
  state: AuthState;
  dispatch: (action: UserContextAction) => void;
};
