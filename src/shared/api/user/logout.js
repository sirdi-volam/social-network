import axiosInstance from '../axiosInstance';


export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout'); // Убедитесь, что путь совпадает с вашим API
    return response.data;
  } catch (error) {
    console.error('Выход не удался', error);
    throw error;
  }
};
