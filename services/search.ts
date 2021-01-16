import { getData } from '../utils/asyncStorage';
import API from '../utils/axios';

const SEARCHHISTORYENDPOINT = '/course/search-history';
const SEARCHENDPOINT = '/course/search';
const SEARCHENDPOINTV2 = '/course/searchV2';
export const getsearchhistory = async () => {
  const { data } = await API.get(SEARCHHISTORYENDPOINT);
  return data.payload;
};

export const postsearchv2 = async (
  keyword: string,
  limit: number,
  offset: number
) => {
  const token = await getData('accessToken');
  const { data } = await API.post(SEARCHENDPOINTV2, {
    token,
    keyword,
    limit,
    offset,
  });

  return data.payload;
};

export const getcourseincategory = async (categoryId: string) => {
  const token = await getData('accessToken');
  const { data } = await API.post(SEARCHENDPOINTV2, {
    token,
    keyword: '',
    opt: { category: [categoryId] },
    limit: 10,
    offset: 1,
  });

  return data.payload;
};
