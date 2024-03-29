import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form.store';
import submissionReducer from './submissions.store';
import profileReducer from './profile.store';
import accountSetupReducer from './accountSetup.store';
import professorScoreReducer from './professorScore.store';

export const store = configureStore({
  reducer: {
    accountSetup: accountSetupReducer,
    form: formReducer,
    profile: profileReducer,
    submissions: submissionReducer,
    professorScore: professorScoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
