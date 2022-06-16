import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import countReducer from './count';

const store = configureStore({
  reducer: { auth: authReducer, count: countReducer },
});

export default store;