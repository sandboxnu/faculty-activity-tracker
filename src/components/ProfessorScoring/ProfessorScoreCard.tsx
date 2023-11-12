import {
  getProfessorScoreForUser,
  updateProfessorScoreForUser,
} from '@/client/professorScore.client';
import { CreateProfessorScoreDto } from '@/models/professorScore.model';
import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import { useEffect, useState } from 'react';
import StaticScoreBubble from './StaticScoreBubble';
import FinalScoreCard from './FinalScoreCard';
import ProfessorScoreItem from './ProfessorScoreItem';
import Tooltip from '@/shared/components/Tooltip';
import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';

interface ProfessorScoreCardProps {
  professorId: number;
}

const ProfessorScoreCard: React.FC<ProfessorScoreCardProps> = ({
  professorId,
}) => {
  const [professorScore, setProfessorScore] =
    useState<CreateProfessorScoreDto | null>(null);
  const [finalScore, setFinalScore] = useState('');

  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      setProfessorScore(data as CreateProfessorScoreDto);
      setFinalScore((data as CreateProfessorScoreDto).totalScore.toString());
    });
  }, [professorId]);

  useEffect(() => {
    if (finalScore !== '') {
      updateProfessorScoreForUser({
        userId: professorId,
        totalScore: parseFloat(finalScore),
      });
    }
  }, [finalScore]);

  if (!professorScore) {
    return <></>;
  }

  const onChange = (value: string) => {
    // There has to be a more elegant way to do this!
    const isValidFloat = /^(?:10(?:\.0*)?|\d(?:\.\d{0,1})?|)$/g.test(value);
    if (isValidFloat) {
      setFinalScore(value);
    }
  };

  const professorScores = [
    { category: 'Teaching', score: professorScore.teachingScore },
    { category: 'Research', score: professorScore.researchScore },
    { category: 'Service', score: professorScore.serviceScore },
  ];

  const averageScore = (
    (professorScore.teachingScore +
      professorScore.researchScore +
      professorScore.serviceScore) /
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
