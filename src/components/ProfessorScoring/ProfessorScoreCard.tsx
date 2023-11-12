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

  return (
    <div className="flex flex-col w-full">
      <StaticSideBarBubble title="">
        <div className="w-full flex justify-between">
          <StaticScoreBubble
            category="Teaching"
            score={professorScore.teachingScore}
          />
          <StaticScoreBubble
            category="Research"
            score={professorScore.researchScore}
          />
          <StaticScoreBubble
            category="Service"
            score={professorScore.serviceScore}
          />
        </div>
      </StaticSideBarBubble>
      <div className="flex flex-col pt-4 space-y-2 w-min">
        <p className="text-body-bold whitespace-nowrap">Final Score</p>
        <FinalScoreCard
          score={parseFloat(professorScore.totalScore + '').toFixed(1)}
        />
      </div>
    </div>
  );
};

export default ProfessorScoreCard;
