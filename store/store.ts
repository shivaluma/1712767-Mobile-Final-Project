import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  // reducers
});
const store = configureStore({
  reducer,
});
export default store;
