import API from '../utils/axios';

export const ENDPOINT = 'user/login';

export const signin = async (value: Authentication): Promise<User> => {
  const { data } = await API.post(ENDPOINT, value);
  return data;
};

export const signup = async (value: Authentication): Promise<User> => {
  const { data } = await API.post(ENDPOINT, value);
  return data;
};
