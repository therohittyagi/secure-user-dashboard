// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store as default
export default store;
