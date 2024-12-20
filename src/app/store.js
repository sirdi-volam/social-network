import { configureStore } from '@reduxjs/toolkit';
import userReducer, { login } from '../entities/user/model/userSlice';
import { searchReducer } from '../features/search';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

const savedUser = localStorage.getItem('user');
if (savedUser) {
  store.dispatch(login(JSON.parse(savedUser)));
}

export default store;
