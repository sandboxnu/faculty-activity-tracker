import { createSlice, Selector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app.store';
import { ProfessorPosition, SabbaticalOption } from '@prisma/client';

export interface ProfileInformation {
  // basic info
  firstName: string;
  lastName: string;
  title?: string;
  // academic info
  position: ProfessorPosition;
  sabbatical: SabbaticalOption;
  teachingPercent: number;
  researchPercent: number;
  servicePercent: number;
  // contact info
  phoneNumber?: string;
  officeLocation?: string;
  email: string;
}

export type ProfileState = Partial<ProfileInformation> & {
  editing: boolean;
};

const initialState: ProfileState = {
  editing: false,
};

export const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setPosition: (state, action: PayloadAction<ProfessorPosition>) => {
      state.position = action.payload;
    },
    setSabbatical: (state, action: PayloadAction<SabbaticalOption>) => {
      state.sabbatical = action.payload;
    },
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
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.phoneNumber = undefined;
      } else if (!isNaN(parseInt(action.payload))) {
        state.phoneNumber = action.payload.replace(/-/g, '');
      }
    },
    setOfficeLocation: (state, action: PayloadAction<string>) => {
      state.officeLocation = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setProfileInfo: (
      state,
      action: PayloadAction<Partial<ProfileInformation>>,
    ) => {
      //state = { ...action.payload, ...state };
      let info = action.payload;
      state.firstName = info.firstName;
      state.lastName = info.lastName;
      state.title = info.title;
      state.position = info.position;
      state.sabbatical = info.sabbatical;
      state.teachingPercent = info.teachingPercent;
      state.researchPercent = info.researchPercent;
      state.servicePercent = info.servicePercent;
      state.phoneNumber = info.phoneNumber;
      state.officeLocation = info.officeLocation;
      state.email = info.email;
    },
    reset: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.title = '';
      state.position = undefined;
      state.sabbatical = undefined;
      state.teachingPercent = 0;
      state.researchPercent = 0;
      state.servicePercent = 0;
      state.phoneNumber = '';
      state.officeLocation = '';
      state.email = '';
    },
  },
});

export const {
  setEditing,
  setFirstName,
  setLastName,
  setTitle,
  setPosition,
  setSabbatical,
  setTeachingPercent,
  setResearchPercent,
  setServicePercent,
  setPercent,
  setPhoneNumber,
  setOfficeLocation,
  setEmail,
  setProfileInfo,
  reset,
} = profileSlice.actions;

export const selectEditing: Selector<RootState, boolean> = (state) =>
  state.profile.editing;

export const selectFirstName: Selector<RootState, string | undefined> = (
  state,
) => state.profile.firstName;

export const selectLastName: Selector<RootState, string | undefined> = (
  state,
) => state.profile.lastName;

export const selectTitle: Selector<RootState, string | undefined> = (state) =>
  state.profile.title;

export const selectPosition: Selector<
  RootState,
  ProfessorPosition | undefined
> = (state) => state.profile.position;

export const selectSabbatical: Selector<
  RootState,
  SabbaticalOption | undefined
> = (state) => state.profile.sabbatical;

export const selectTeachingPercent: Selector<RootState, number | undefined> = (
  state,
) => state.profile.teachingPercent;

export const selectResearchPercent: Selector<RootState, number | undefined> = (
  state,
) => state.profile.researchPercent;

export const selectServicePercent: Selector<RootState, number | undefined> = (
  state,
) => state.profile.servicePercent;

export const selectPhoneNumber: Selector<RootState, string | undefined> = (
  state,
) => state.profile.phoneNumber;

export const selectOfficeLocation: Selector<RootState, string | undefined> = (
  state,
) => state.profile.officeLocation;

export const selectEmail: Selector<RootState, string | undefined> = (state) =>
  state.profile.email;

export const selectProfileInfo: Selector<
  RootState,
  Partial<ProfileInformation>
> = (state) => ({
  ...state.profile,
});

export type ProfileCompletionStatus = ProfileInformation | string;

export const selectProfileCompletionStatus: Selector<
  RootState,
  ProfileCompletionStatus
> = (state) => {
  return 'true';
};

export default profileSlice.reducer;
