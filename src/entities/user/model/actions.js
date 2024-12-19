import { login, logout } from './userSlice';
import axiosInstance from '../../../shared/api/axiosInstance';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    dispatch(login(response.data));
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('authToken');
  dispatch(logout());
};
