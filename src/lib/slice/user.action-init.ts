// user.action-init.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ky } from '../ky';
import { IUserInit } from '../interface';
export const fetchUsers = createAsyncThunk<IUserInit, void, { rejectValue: string }>('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await ky.get<{ token: string; user: IUserInit }>('/api/auth/refresh');
    localStorage.setItem('access_token', response.data.token);
    return response.data.user;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
  }
});
