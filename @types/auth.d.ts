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

interface PasswordForm {
  password: string;
  newpassword: string;
  newpasswordconfirmation: string;
}

interface ProfileForm {
  name: string;
  avatar?: string;
  phone: string;
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
  hasInit: boolean;
};

type ActionType = 'UPDATE_USER' | 'REMOVE_USER';

type UserContextAction = {
  type: ActionType;
  payload: {
    user: User | null;
    hasInit: boolean;
  };
};

type UserContextType = {
  state: AuthState;
  dispatch: (action: UserContextAction) => void;
};
