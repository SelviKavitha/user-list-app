import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/userSlice';
import authReducer from '../app/authSlice';


export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
  },
});

