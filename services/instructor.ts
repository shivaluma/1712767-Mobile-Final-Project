import API from '../utils/axios';

const GETINSTRUCTORENDPOINT = '/instructor/detail';

export const getinstructor = async (instructorId: string) => {
  const { data } = await API.get(GETINSTRUCTORENDPOINT + '/' + instructorId);
  return data.payload;
};
