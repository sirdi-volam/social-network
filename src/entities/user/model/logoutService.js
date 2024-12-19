import { logout } from '../../../shared/api/user/logout';
import { logoutUser } from './userSlice';

export const performLogout = () => async (dispatch) => {
  try {
    await logout(); // Вызов API
    dispatch(logoutUser()); // Обновление состояния
  } catch (error) {
    console.error('Ошибка выхода:', error);
  }
};
