import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload; // Устанавливаем строку поиска
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
