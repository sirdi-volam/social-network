import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLink: null,
};

const asideSlice = createSlice({
  name: 'aside',
  initialState,
  reducers: {
    setActiveLink(state, action) {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = asideSlice.actions;
export default asideSlice.reducer;