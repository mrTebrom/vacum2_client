// user.reducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IToken {
  token: string | null;
}


const initialState: IToken = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, payload: PayloadAction<string>) {
      state.token = payload.payload;
    },
    unSetToken(state) {
      state.token = null;
    }
  },

});
export const { setToken, unSetToken } = tokenSlice.actions
export default tokenSlice.reducer;
