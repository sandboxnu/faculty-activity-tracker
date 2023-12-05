import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app.store';
import { ProfessScoreDto } from '../models/professorScore.model';

export interface ProfessorScoreState {
  professorScores: Record<number, ProfessScoreDto>;
}

const initialState: ProfessorScoreState = {
  professorScores: {},
};

export const professorScoreSlice = createSlice({
  name: 'ProfessorScore',
  initialState,
  reducers: {
    saveProfessorScore: (state, action: PayloadAction<ProfessScoreDto>) => {
      const { userId } = action.payload;
      state.professorScores[userId] = action.payload;
    },
  },
});

export const { saveProfessorScore } = professorScoreSlice.actions;

export const selectProfessorScores = (state: RootState) =>
  state.professorScore.professorScores;

export default professorScoreSlice.reducer;
