import { createSlice } from '@reduxjs/toolkit';

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: 'light',
  },
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = preferencesSlice.actions;
