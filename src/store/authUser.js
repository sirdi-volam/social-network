import toast from 'react-hot-toast';
import { create } from 'zustand';
import instance from '../axios.js';
import { useNavigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  status: null, // "signup", "login", "logout", "check"

  setLoading: (status) => set({ isLoading: true, status }),
  clearLoading: () => set({ isLoading: false, status: null }),

  handleError: (error, fallbackMessage) => {
    const errorMessage = error.response?.data?.message || fallbackMessage;
    toast.error(errorMessage);
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

  login: async (credentials, onSuccess) => {
    set((state) => ({ ...state, isLoading: true, status: 'login' }));

    try {
      const response = await instance.post("/api/auth/login", credentials);
      set((state) => ({ ...state, user: response.data.user }));
      toast.success("Успешный вход");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      set((state) => ({ ...state, user: null }));
      set((state) => ({ ...state, isLoading: false, status: null }));
      if (error.response) {
        toast.error(error.response?.data?.message || "Ошибка входа");
      } else {
        toast.error("Неизвестная ошибка");
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
      const response = await instance.get("/api/auth/authCheck");
      set({ user: response.data.user });
    } catch (error) {
      set({ user: null });
      set().handleError(error, "Ошибка проверки аутентификации");
    } finally {
      set().clearLoading();
    }
  },
}));
