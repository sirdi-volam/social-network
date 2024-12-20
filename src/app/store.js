import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/userSlice';
import { searchReducer } from '../features/search';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
