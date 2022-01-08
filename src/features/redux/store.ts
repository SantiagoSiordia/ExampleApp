import { configureStore } from '@reduxjs/toolkit';
import { preferencesSlice } from './preferences';

export const store = configureStore({
  reducer: preferencesSlice.reducer,
});
