import { createSlice, Selector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app.store';

export interface ProfileState {
  teachingPercent: number;
  researchPercent: number;
  servicePercent: number;
}

const initialState: ProfileState = {
  teachingPercent: 0,
  researchPercent: 0,
  servicePercent: 0,
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
		setPercent: (state, action: PayloadAction<{type: string, percent: number}>) => {
			switch (action.payload.type) {
				case "teaching":
					state.teachingPercent = action.payload.percent;
					break;
				case "creative":
				case "research":
					state.researchPercent = action.payload.percent;;
					break;
				case "service":
					state.servicePercent = action.payload.percent;
				default:
					break;
			}
		},
		reset: (state) => {
			state.teachingPercent = 0;
			state.researchPercent = 0;
			state.servicePercent = 0;
		}
  },
});

export const { setTeachingPercent, setResearchPercent, setServicePercent, setPercent, reset } = profileSlice.actions;

export const selectTeachingPercent: Selector<RootState, number> = (state) => state.profile.teachingPercent;

export const selectResearchPercent: Selector<RootState, number> = (state) => state.profile.researchPercent;

export const selectServicePercent: Selector<RootState, number> = (state) => state.profile.servicePercent;

export default profileSlice.reducer;
