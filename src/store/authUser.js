import toast from 'react-hot-toast';
import { create } from 'zustand';
import instance from '../axios.js';
import { useNavigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({
  isLoggingIn: false,
  user: null,
  isLoading: false,
  isLoggedIn: false,
  status: null, // "signup", "login", "logout", "check"

  setLoading: (status) => set({ isLoading: true, status }),
  clearLoading: () => set({ isLoading: false, status: null }),

  handleError: (error, fallbackMessage) => {
    const errorMessage = error.response?.data?.message || fallbackMessage;
    toast.error(errorMessage);
  },
  
  login: async ({ email, password }, onSuccess) => {
      set({ isLoggingIn: true }); // Должен обновить состояние
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Ошибка авторизации');
        }

        const data = await response.json();

        set({ user: data.user, isLoggedIn: true });
        if (onSuccess) onSuccess(); // Перенаправляем после успеха
      } catch (error) {
        console.error('Ошибка входа:', error.message);
      } finally {
        set({ isLoggingIn: false }); // Возвращаем isLoggingIn в false
      }
    },

  signup: async (credentials) => {
    set((state) => ({ ...state, isLoading: true, status: 'signup' }));
    try {
      const response = await instance.post('/api/auth/register', credentials);
      set((state) => ({ ...state, user: response.data.user }));
      toast.success('Аккаунт зарегистрирован');
    } catch (error) {
      console.error('Error during signup:', error); // Логируем ошибку
      set((state) => ({ ...state, user: null }));
      set((state) => ({ ...state, isLoading: false, status: null }));
      if (error.response) {
        toast.error(error.response?.data?.message || 'Ошибка регистрации');
      } else {
        toast.error('Неизвестная ошибка');
      }
    } finally {
      set((state) => ({ ...state, isLoading: false, status: null }));
    }
  },


  logout: async () => {
    set().setLoading("logout");
    try {
      await instance.post("/api/auth/logout");
      set({ user: null });
      toast.success("Успешный выход");
    } catch (error) {
      set().handleError(error, "Ошибка выхода");
    } finally {
      set().clearLoading();
    }
  },

  authCheck: async () => {
    set().setLoading("check");
    try {
      // Отправляем запрос на сервер для проверки cookies
      const response = await instance.get("/api/auth/authCheck", {
        withCredentials: true, // Обязательно для отправки cookies
      });

      // Устанавливаем данные пользователя, если они возвращены
      set({ user: response.data.user });
    } catch (error) {
      set({ user: null }); // Сбрасываем пользователя при ошибке
      set().handleError(error, "Ошибка проверки аутентификации");
    } finally {
      set().clearLoading();
    }
  },

}));
