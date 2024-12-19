import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // Устанавливаем пользователя
    },
    logout(state) {
      state.user = null; // Сбрасываем пользователя
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
