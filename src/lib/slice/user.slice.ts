// user.reducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './user.action-init';
import { IUserInit } from '../interface';

interface UserState {
  users: IUserInit | null;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: UserState = {
  users: null,
  isLoading: false,
  error: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.error = action.payload;
        } else {
          state.isLoading = false;
          state.error = 'Не удалось загрузить пользователей';
        }
        state.isAuth = false;
      });
  },
});

export default userSlice.reducer;
