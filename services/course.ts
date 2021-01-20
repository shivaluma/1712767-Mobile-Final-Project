import API from '../utils/axios';

export const TOPSELLENDPOINT = 'course/top-sell';
export const TOPNEWENDPOINT = 'course/top-new';
export const TOPRATEENDPOINT = 'course/top-rate';
export const COURSEINFOENDPOINT = 'course/get-course-detail';
export const DETAILWITHLESSON = 'course/detail-with-lesson';
export const COURSERATINGENDPOINT = 'course/get-rating';
export const ENROLLCOURSEFREEENDPOINT = 'payment/get-free-courses';
export const RECOMMENDINGCOURSEENDPOINT = '​user​/recommend-course​';
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

export const getrecommendedcourse = async (
  uId: string,
  limit: number,
  offset: number
): Promise<Course[]> => {
  const { data } = await API.get(
    `user/recommend-course/${uId}/${limit}/${offset}`
  );

  return data;
};

export const getcoursedetail = async (
  id: string,
  uid: string | null = null
): Promise<any> => {
  const { data } = await API.get(COURSEINFOENDPOINT + '/' + id + '/' + uid);

  return data.payload;
};

export const detailwithlesson = async (id: string): Promise<any> => {
  const { data } = await API.get(DETAILWITHLESSON + '/' + id);

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
  const { data } = await API.get(`lesson/video/${courseId}/${lessonId}`);
  return data.payload;
};

export const getexercisebylesson = async (lessonId: string): Promise<any> => {
  const { data } = await API.post(`exercise/student/list-exercise-lesson`, {
    lessonId,
  });
  return data.payload;
};

export const updatetimelearningvideo = async (
  lessonId: string,
  time: number
): Promise<any> => {
  console.log(lessonId);
  const { data } = await API.put('lesson/update-current-time-learn-video', {
    lessonId,
    currentTime: time,
  });
  return data.payload;
};

export const finishlesson = async (lessonId: string): Promise<any> => {
  const { data } = await API.post('lesson/update-status', {
    lessonId,
  });
  return data.payload;
};

export const lastwatchedlesson = async (courseId: string) => {
  const { data } = await API.get('course/last-watched-lesson/' + courseId);
  return data.payload;
};

export const getratinglist = async (courseId: string) => {
  const { data } = await API.get('course/get-rating/' + courseId);
  console.log(data);
  return data.payload;
};

export const postratingcourse = async (result: any, courseId: string) => {
  const { data } = await API.post('course/rating-course/', {
    ...result,
    courseId,
  });
  return data.payload;
};
