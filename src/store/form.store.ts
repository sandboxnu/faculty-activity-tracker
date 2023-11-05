import { createSlice, Selector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityCategory,
  ActivityWeight,
  CreateActivityDto,
  Semester,
} from '../models/activity.model';
import { RootState } from './app.store';

export type FormStep = 'selection' | 'form' | 'success' | 'loading' | 'error';

// TODO: We might want to make this string or null? and do the a null check inside the component? Or we can check for null and validate
// that it fits the intended format before sending to the backend? Either way we have to check for correct format before sending to backend
export interface FormState {
  step: FormStep;
  activityId: number | null;
  activityName: string | null;
  category: ActivityCategory | null;
  weight: ActivityWeight | null;
  semesters: Semester[] | null;
  year: number | null;
  date: string;
  description: string | null;
  otherDescription: string | null;
  lastDateModified: bigint | null;
}

// data to be provided when creating/updating activity
export type ActivityFormData = Omit<
  CreateActivityDto,
  'userId' | 'dateModified' | 'isFavorite' | 'meritStatus'
>;

const initialState: FormState = {
  step: 'selection',
  activityId: null,
  activityName: null,
  category: null,
  weight: null,
  semesters: null,
  year: new Date().getFullYear(),
  date: '',
  description: null,
  otherDescription: null,
  lastDateModified: null,
};

export const formSlice = createSlice({
  name: 'Form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<FormStep>) => {
      state.step = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.activityName = action.payload;
    },
    setCategory: (state, action: PayloadAction<ActivityCategory>) => {
      state.category = action.payload;
    },
    setWeight: (state, action: PayloadAction<ActivityWeight>) => {
      state.weight = action.payload;
    },
    setSemesters: (state, action: PayloadAction<Semester[]>) => {
      state.semesters = action.payload;
    },
    addSemester: (state, action: PayloadAction<Semester>) => {
      state.semesters = Array.from(
        new Set([...(state.semesters || []), action.payload]),
      );
    },
    removeSemester: (state, action: PayloadAction<Semester>) => {
      state.semesters =
        state.semesters?.filter((s) => s !== action.payload) || null;
    },
    setYear: (state, action: PayloadAction<number | null>) => {
      state.year = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setOtherDescription: (state, action: PayloadAction<string | null>) => {
      state.otherDescription = action.payload;
    },
    setActivityId: (state, action: PayloadAction<number>) => {
      state.activityId = action.payload;
    },
    setLastDateModified: (state, action: PayloadAction<bigint | null>) => {
      state.lastDateModified = action.payload;
    },
    resetForm: (state) => {
      state.step = 'selection';
      state.activityName = null;
      state.category = null;
      state.weight = null;
      state.semesters = null;
      state.year = new Date().getFullYear();
      state.date = '';
      state.description = null;
      state.otherDescription = null;
      state.lastDateModified = null;
      state.activityId = null;
    },
  },
});

export const {
  setName,
  setStep,
  setCategory,
  setWeight,
  setSemesters,
  addSemester,
  removeSemester,
  setYear,
  setDate,
  setDescription,
  setOtherDescription,
  setActivityId,
  setLastDateModified,
  resetForm,
} = formSlice.actions;

export const selectName: Selector<RootState, string | null> = (state) =>
  state.form.activityName;

export const selectStep: Selector<RootState, FormStep> = (state) =>
  state.form.step;

export const selectCategory: Selector<RootState, ActivityCategory | null> = (
  state,
) => state.form.category;

export const selectWeight: Selector<RootState, ActivityWeight | null> = (
  state,
) => state.form.weight;

export const selectSemesters: Selector<RootState, Semester[] | null> = (
  state,
) => state.form.semesters;

export const selectCheckedSemesters: Selector<
  RootState,
  Record<Semester, boolean>
> = (state) => {
  const checkedSemesters: Record<Semester, boolean> = {
    FALL: false,
    SPRING: false,
    SUMMER: false,
    OTHER: false,
  };
  state.form.semesters?.forEach((s) => (checkedSemesters[s] = true));
  return checkedSemesters;
};

export const selectYear: Selector<RootState, number | null> = (state) =>
  state.form.year;

export const selectDate: Selector<RootState, string> = (state) =>
  state.form.date;

export const selectDescription: Selector<RootState, string | null> = (state) =>
  state.form.description;

export const selectOtherDescription: Selector<RootState, string | null> = (
  state,
) => state.form.otherDescription;

export const selectActivityId: Selector<RootState, number | null> = (state) =>
  state.form.activityId;

export const selectLastDateModified: Selector<RootState, bigint | null> = (
  state,
) => state.form.lastDateModified;

export const selectActivityFormData: Selector<
  RootState,
  ActivityFormData | null
> = (state) => {
  if (
    !state.form.activityName ||
    !state.form.description ||
    !state.form.category ||
    !state.form.weight ||
    !state.form.semesters ||
    !state.form.year
  )
    return null;
  const otherChecked = state.form.semesters.includes('OTHER');
  if (otherChecked && !state.form.otherDescription) return null;
  return {
    name: state.form.activityName,
    description: state.form.description,
    category: state.form.category,
    significance: state.form.weight,
    semester: state.form.semesters,
    semesterOtherDescription: state.form.otherDescription,
    year: state.form.year,
  };
};

export default formSlice.reducer;
