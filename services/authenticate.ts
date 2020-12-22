import API from '../utils/axios';

export const LOGINENDPOINT = 'user/login';
export const SIGNUPENDPOINT = 'user/register';
export const RESENDEMAILENDPOINT = 'user/send-activate-email';
export const LIKECOURSEENDPOINT = 'user/like-course';
export const GETCOURSESTATUSENDPOINT = 'user/get-course-like-status';
export const signin = async (
  value: Authentication
): Promise<{ message: string; token: string; userInfo: User }> => {
  const { data } = await API.post(LOGINENDPOINT, value);
  return data;
};

export const signup = async (value: Authentication): Promise<Message> => {
  const { data } = await API.post(SIGNUPENDPOINT, value);
  return data;
};

export const resendemail = async (value: string): Promise<Message> => {
  const { data } = await API.post(RESENDEMAILENDPOINT, value);
  return data;
};

export const togglelikecourse = async (courseId: string) => {
  const { data } = await API.post(LIKECOURSEENDPOINT, { courseId });
  return data;
};

export const getcourselikestatus = async (courseId: string) => {
  const { data } = await API.get(GETCOURSESTATUSENDPOINT + '/' + courseId);
  return data;
};
