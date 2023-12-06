import React, { useEffect, useState } from 'react';
import {
  getProfessorScoreForUser,
  updateProfessorScoreForUser,
} from '@/client/professorScore.client';
import {
  CreateProfessorScoreDto,
  UpdateProfessorScoreDto,
} from '@/models/professorScore.model';
import { ResponseStatus } from '@/client/activities.client';
import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import ProfessorScoreItem from './ProfessorScoreItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveProfessorScore,
  selectProfessorScores,
} from '@/store/professorScore.store';

interface ProfessorScoreCardProps {
  professorId: number;
}

const ProfessorScoreCard: React.FC<ProfessorScoreCardProps> = ({
  professorId,
}) => {
  const scores = useSelector(selectProfessorScores);
  const [finalScore, setFinalScore] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      if (data === ResponseStatus.UnknownError) {
        setError('Unknown Error');
      } else if (data === ResponseStatus.Unauthorized) {
        setError('Unauthorized');
      } else if (data === ResponseStatus.BadRequest) {
        setError('Bad Request');
      } else {
        dispatch(saveProfessorScore(data));
        setFinalScore(data.totalScore.toString() ?? '');
      }
    });
  }, [professorId]);

  useEffect(() => {
    if (finalScore !== '') {
      updateProfessorScoreForUser({
        userId: professorId,
        totalScore: parseFloat(finalScore),
      });
    }
  }, [finalScore, professorId]);

  if (!scores) {
    return null;
  }

  const onChange = (value: string) => {
    const isValidFloat = /^(?:10(?:\.0*)?|\d(?:\.\d{0,1})?|)$/g.test(value);
    if (isValidFloat) {
      setFinalScore(value);
    }
  };

  const professorScores = [
    { category: 'Teaching', score: scores.teachingScore },
    { category: 'Research', score: scores.researchScore },
    { category: 'Service', score: scores.serviceScore },
  ];

  const averageScore = (
    (scores.teachingScore + scores.researchScore + scores.serviceScore) /
    3
  ).toFixed(1);

  const tooltipMessage =
    'A professor may be recently hired or have special circumstances, so you can adjust their score accordingly below.';

  return (
    <div className="flex w-full min-w-[64px] flex-col">
      <StaticSideBarBubble title="">
        <div className="flex w-full flex-col justify-between space-y-3">
          <p className="text-center text-body-bold xl:text-left">Scoring</p>
          <div className="flex flex-col justify-between border-b-2 px-2 pb-4 xl:flex-row">
            {professorScores.map(({ category, score }) => (
              <ProfessorScoreItem
                category={category}
                score={score}
                key={category}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between px-4 xl:flex-row">
            <ProfessorScoreItem
              category={'Average'}
              score={parseFloat(averageScore)}
              className="space-y-2"
            />
            <div className="flex items-center justify-center xl:justify-start">
              <InputContainer
                label="Final Score"
                labelClass="text-body"
                tooltipMessage={tooltipMessage}
                className="justify-center text-body-bold"
              >
                <TextInput
                  value={finalScore}
                  change={onChange}
                  placeholder=""
                  className="max-w-[48px]"
                  centerText={true}
                />
              </InputContainer>
            </div>
          </div>
        </div>
      </StaticSideBarBubble>
    </div>
  );
};

export default ProfessorScoreCard;
