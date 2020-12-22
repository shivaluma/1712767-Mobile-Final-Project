import API from '../utils/axios';

export const GETALLENDPOINT = 'category/all';

export const getallcategories = async () => {
  const { data } = await API.get(GETALLENDPOINT);
  return data.payload;
};
