import { createSlice } from '@reduxjs/toolkit';

export type preferencesStateType = {
  theme: 'light' | 'dark';
};

export const initialState: preferencesStateType = {
  theme: 'light',
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = preferencesSlice.actions;
