import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../store/form.store';
import submissionReducer from './submissions.store';

export const store = configureStore({
  reducer: {
    form: formReducer,
    submissions: submissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
