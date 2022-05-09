import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';

const rootReducer = combineReducers({ product: productSlice });
const store = configureStore({
  reducer: rootReducer,
  serializableCheck: false,
});

export default store;
