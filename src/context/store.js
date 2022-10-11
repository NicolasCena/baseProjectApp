import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import permissionsSlice from './permissionsSlice';


export const store = configureStore({
  reducer: {
    permissions: permissionsSlice,
  }
})