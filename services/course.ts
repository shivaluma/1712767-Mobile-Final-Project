import API from '../utils/axios';

export const TOPSELLENDPOINT = 'course/top-sell';
export const TOPNEWENDPOINT = 'course/top-new';
export const TOPRATEENDPOINT = 'course/top-rate';
export const COURSEINFOENDPOINT = 'course/get-course-detail';
export const COURSERATINGENDPOINT = 'course/get-rating';
export const ENROLLCOURSEFREEENDPOINT = '/payment/get-free-courses';
export const gettopsell = async (): Promise<Course[]> => {
  const { data } = await API.post(TOPSELLENDPOINT, {
    limit: 10,
    page: 1,
  });
  return data;
};

export const gettopnew = async (): Promise<Course[]> => {
  const { data } = await API.post(TOPSELLENDPOINT, {
    limit: 10,
    page: 1,
  });
  return data;
};

export const gettoprate = async (): Promise<Course[]> => {
  const { data } = await API.post(TOPSELLENDPOINT, {
    limit: 10,
    page: 1,
  });
  return data;
};

export const getcoursedetail = async (id: string): Promise<Course> => {
  const { data } = await API.get(COURSEINFOENDPOINT + '/' + id + '/' + null);

  return data.payload;
};

export const getratings = async (id: string): Promise<Course[]> => {
  const { data } = await API.get(COURSERATINGENDPOINT + '/' + id);

  return data.payload;
};

export const postenrollcoursefree = async (
  courseId: string
): Promise<{ message: string }> => {
  const { data } = await API.post(ENROLLCOURSEFREEENDPOINT, { courseId });

  return data.payload;
};

export const getvideourloflesson = async (
  courseId: string,
  lessonId: string
): Promise<any> => {
  const { data } = await API.get(`/lesson/video/${courseId}/${lessonId}`);
  return data.payload;
};
