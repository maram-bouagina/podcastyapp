// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // you can add other reducers here
  },
});

export default store;
