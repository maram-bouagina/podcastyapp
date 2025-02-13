
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  token: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, token, email } = action.payload;
      state.userId = userId;
      state.token = token;
      state.email = email;
      
    },
    logout: (state) => {
      state.userId = '';
      state.token = '';
      state.email = '';
   
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
