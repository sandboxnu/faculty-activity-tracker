import { createSlice, Selector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app.store';
import { ProfessorPosition } from '@prisma/client';

export interface ProfileState {
  teachingPercent: number;
  researchPercent: number;
  servicePercent: number;
  position: ProfessorPosition | null;
  phoneNumber: string;
  officeLocation: string;
}

const initialState: ProfileState = {
  teachingPercent: 0,
  researchPercent: 0,
  servicePercent: 0,
  position: null,
  phoneNumber: '',
  officeLocation: '',
};

export const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setTeachingPercent: (state, action: PayloadAction<number>) => {
      state.teachingPercent = action.payload;
    },
    setResearchPercent: (state, action: PayloadAction<number>) => {
      state.researchPercent = action.payload;
    },
    setServicePercent: (state, action: PayloadAction<number>) => {
      state.servicePercent = action.payload;
    },
    setPercent: (
      state,
      action: PayloadAction<{ type: string; percent: number }>,
    ) => {
      switch (action.payload.type) {
        case 'teaching':
          state.teachingPercent = action.payload.percent;
          break;
        case 'creative':
        case 'research':
          state.researchPercent = action.payload.percent;
          break;
        case 'service':
          state.servicePercent = action.payload.percent;
        default:
          break;
      }
    },
    setPosition: (state, action: PayloadAction<ProfessorPosition>) => {
      state.position = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setOfficeLocation: (state, action: PayloadAction<string>) => {
      state.officeLocation = action.payload;
    },
    reset: (state) => {
      state.teachingPercent = 0;
      state.researchPercent = 0;
      state.servicePercent = 0;
      state.position = null;
      state.phoneNumber = '';
      state.officeLocation = '';
    },
  },
});

export const {
  setTeachingPercent,
  setResearchPercent,
  setServicePercent,
  setPercent,
  setPosition,
  setPhoneNumber,
  setOfficeLocation,
  reset,
} = profileSlice.actions;

export const selectTeachingPercent: Selector<RootState, number> = (state) =>
  state.profile.teachingPercent;

export const selectResearchPercent: Selector<RootState, number> = (state) =>
  state.profile.researchPercent;

export const selectServicePercent: Selector<RootState, number> = (state) =>
  state.profile.servicePercent;

export const selectPosition: Selector<RootState, ProfessorPosition | null> = (
  state,
) => state.profile.position;

export const selectPhoneNumber: Selector<RootState, string> = (state) =>
  state.profile.phoneNumber;

export const selectOfficeLocation: Selector<RootState, string> = (state) =>
  state.profile.officeLocation;

export default profileSlice.reducer;
