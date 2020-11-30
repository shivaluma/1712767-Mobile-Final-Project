interface AuthenticationForm {
  username: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: string;
  email: string;
  avatar: string;
  name: string;
  favoriteCategories: string[];
  phone: string;
  type: string;
  isDeleted: boolean;
  isActivated: boolean;
  createdAt: string;
  updatedAt: string;
}
