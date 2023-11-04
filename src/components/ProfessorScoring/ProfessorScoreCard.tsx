import { getProfessorScoreForUser } from '@/client/professorScore.client';
import { CreateProfessorScoreDto } from '@/models/professorScore.model';
import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import { useEffect, useState } from 'react';
import StaticScoreBubble from './StaticScoreBubble';
import FinalScoreCard from './FinalScoreCard';

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

  return (
    <div className="flex w-full min-w-[64px] flex-col">
      <StaticSideBarBubble title="">
        <div className="flex w-full flex-col justify-between xl:flex-row">
          {professorScores.map((item) => (
            <div key={item.category} className="w-full xl:w-1/4">
              <StaticScoreBubble category={item.category} score={item.score} />
            </div>
          ))}
        </div>
      </StaticSideBarBubble>
      <div className="flex w-min flex-col space-y-2 pt-4">
        <p className="whitespace-nowrap text-body-bold">Final Score</p>
        <FinalScoreCard
          score={parseFloat(professorScore.totalScore + '').toFixed(1)}
        />
      </div>
    </div>
  );
};

export default ProfessorScoreCard;
