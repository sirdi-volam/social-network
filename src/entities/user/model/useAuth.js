import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user = useSelector((state) => state.user.user); // Извлекаем пользователя из состояния
  return Boolean(user); // Если пользователь существует, возвращаем true
};
