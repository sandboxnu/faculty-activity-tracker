import { getProfessorScoreForUser } from '@/client/professorScore.client';
import { CreateProfessorScoreDto } from '@/models/professorScore.model';
import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import { useEffect, useState } from 'react';
import StaticScoreBubble from './StaticScoreBubble';
import FinalScoreCard from './FinalScoreCard';
import ProfessorScoreItem from './ProfessorScoreItem';
import Tooltip from '@/shared/components/Tooltip';
import InputContainer from '@/shared/components/InputContainer';

interface ProfessorScoreCardProps {
  professorId: number;
}

const ProfessorScoreCard: React.FC<ProfessorScoreCardProps> = ({
  professorId,
}) => {
  const [professorScore, setProfessorScore] =
    useState<CreateProfessorScoreDto | null>(null);

  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      setProfessorScore(data as CreateProfessorScoreDto);
    });
  }, [professorId]);

  if (!professorScore) {
    return <></>;
  }

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

  const sampleTextArray = ['Sample Text 1', 'Sample Text 2', 'Sample Text 3'];

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
            />
            <div className="text-center">
              <p className="text-body">Final Score</p>
            </div>
          </div>
        </div>
      </StaticSideBarBubble>
    </div>
  );
};

export default ProfessorScoreCard;
