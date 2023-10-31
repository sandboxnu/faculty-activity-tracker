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
      setProfessorScore(data);
    });
  }, [professorId]);

  if (!professorScore) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col">
      <StaticSideBarBubble title="">
        <div className="flex w-full justify-between">
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
