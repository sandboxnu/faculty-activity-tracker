import { CreateProfessorInfoDto } from '@/models/professorInfo.model';
import { CreateUserDto } from '@/models/user.model';
import { Role } from '@prisma/client';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './app.store';

export type AccountSetupStep = 'role' | 'user info' | 'professor info';

interface AccountSetupState {
  role: Role | null;
  userInfo: CreateUserDto | null;
  professorInfo: CreateProfessorInfoDto | null;
  step: AccountSetupStep;
  email: string;
  name: string;
}

const initialState: AccountSetupState = {
  role: null,
  userInfo: null,
  professorInfo: null,
  step: 'role',
  email: '',
  name: '',
};

export const accountSetupSlice = createSlice({
  name: 'accountSetup',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<CreateUserDto>) => {
      state.userInfo = action.payload;
    },
    setProfessorInfo: (
      state,
      action: PayloadAction<CreateProfessorInfoDto>,
    ) => {
      state.professorInfo = action.payload;
    },
    setStep: (state, action: PayloadAction<AccountSetupStep>) => {
      state.step = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    reset: (state) => {
      state.role = null;
      state.userInfo = null;
      state.professorInfo = null;
      state.step = 'role';
      state.email = '';
      state.name = '';
    },
  },
});

export const {
  setRole,
  setUserInfo,
  setProfessorInfo,
  setStep,
  setEmail,
  setName,
  reset,
} = accountSetupSlice.actions;

export const selectRole: Selector<RootState, Role | null> = (state) =>
  state.accountSetup.role;

export const selectUserInfo: Selector<RootState, CreateUserDto | null> = (
  state,
) => state.accountSetup.userInfo;

export const selectProfessorInfo: Selector<
  RootState,
  CreateProfessorInfoDto | null
> = (state) => state.accountSetup.professorInfo;

export const selectStep: Selector<RootState, AccountSetupStep> = (state) =>
  state.accountSetup.step;

export const selectEmail: Selector<RootState, string> = (state) =>
  state.accountSetup.email;

export const selectName: Selector<RootState, string> = (state) =>
  state.accountSetup.name;

export const selectFieldsIncomplete: Selector<RootState, boolean> = (state) =>
  false;

export default accountSetupSlice.reducer;
