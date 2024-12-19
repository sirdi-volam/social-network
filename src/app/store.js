import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // Добавляем редьюсер пользователя
  },
});
