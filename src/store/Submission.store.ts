import { createSlice, Selector, PayloadAction } from "@reduxjs/toolkit"
import {RootState} from "../app/app.store";
import { ActivityDto } from "../models/activity.dto";

export interface SubmissionState { 
    activities : ActivityDto[];
}

const initialState: SubmissionState = { 
    activities : []
}

export const submissionSlice = createSlice({
    name: 'Submission',
    initialState, 
    reducers: { 
        saveActivities: (state, action: PayloadAction<ActivityDto[]>) => { 
            state.activities = action.payload;
        }
    }

});

export const {saveActivities} = submissionSlice.actions;

export const selectActivities: Selector<RootState, ActivityDto[]> = state => state.submissions.activities;

export default submissionSlice.reducer;
