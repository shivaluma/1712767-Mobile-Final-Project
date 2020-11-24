import { createSlice } from '@reduxjs/toolkit';

export type User = {
  username: string;
};

const initialState: User | null = null;

const authSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeUser(state, action) {
      return action.payload;
    },
    removeUser(state) {
      state = null;
    },
  },
});

export const { changeUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
