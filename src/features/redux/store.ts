import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createDispatchHook, createSelectorHook } from 'react-redux';
import { preferencesSlice } from './preferences';

const rootReducer = combineReducers({
  preferences: preferencesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppSelector = createSelectorHook<RootState>();
export const useAppDispatch = createDispatchHook<RootState>();
export type RootState = ReturnType<typeof rootReducer>;
