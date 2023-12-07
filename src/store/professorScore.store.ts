import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app.store';
import { CreateProfessorScoreDto } from '../models/professorScore.model';

export interface ProfessorScoreState {
  professorScore: CreateProfessorScoreDto | null;
}

const initialState: ProfessorScoreState = {
  professorScore: null,
};

export const professorScoreSlice = createSlice({
  name: 'ProfessorScore',
  initialState,
  reducers: {
    saveProfessorScore: (
      state,
      action: PayloadAction<CreateProfessorScoreDto>,
    ) => {
      state.professorScore = action.payload;
    },
  },
});

export const { saveProfessorScore } = professorScoreSlice.actions;

export const selectProfessorScores = (state: RootState) =>
  state.professorScore.professorScore;

export default professorScoreSlice.reducer;
