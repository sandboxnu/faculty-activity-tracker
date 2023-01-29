import { createSlice, Selector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/app.store";
import { ActivityCategory, ActivityWeight, Semester } from "../models/activity.dto";

export type FormStep = 'selection' | 'form' | 'success' | 'loading' | 'error'

// TODO: We might want to make this string or null? and do the a null check inside the component? Or we can check for null and validate
// that it fits the intended format before sending to the backend? Either way we have to check for correct format before sending to backend
export interface FormState {
    step: FormStep,
    activityName: string | null
    category: ActivityCategory | null,
    weight: ActivityWeight | null,
    semester: Semester | null,
    year: number | null,
    date: string,
    description: string,
};

const initialState: FormState = {
    step: 'selection',
    activityName: null,
    category: null,
    weight: null,
    semester: null,
    year: null,
    date: '',
    description: '',
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
        setSemester: (state, action: PayloadAction<Semester>) => {
            state.semester = action.payload;
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
        resetForm: (state) => {
            state.step = 'selection';
            state.activityName = null;
            state.category = null;
            state.weight = null;
            state.semester = null;
            state.year = null;
            state.date = '';
            state.description = '';
        },
    },
});

export const { setName, setStep, setCategory, setWeight, setSemester, setYear, setDate, setDescription, resetForm } = formSlice.actions;

export const selectName: Selector<RootState, string|null> = (state) => state.form.activityName;

export const selectStep: Selector<RootState, FormStep> = (state) => state.form.step;

export const selectCategory: Selector<RootState, ActivityCategory|null> = (state) => state.form.category;

export const selectWeight: Selector<RootState, ActivityWeight | null> = (state) => state.form.weight;

export const selectSemester: Selector<RootState, Semester | null> = (state) => state.form.semester;

export const selectYear: Selector<RootState, number | null> = (state) => state.form.year;

export const selectDate: Selector<RootState, string> = (state) => state.form.date;

export const selectDescription: Selector<RootState, string> = (state) => state.form.description;

export default formSlice.reducer;
