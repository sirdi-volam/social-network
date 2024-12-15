import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuth(!!authToken); // Проверяем наличие токена
  }, []);

  return isAuth;
};