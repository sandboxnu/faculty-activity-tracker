import { getProfessorScoreForUser } from "@/client/professorScore.client";
import { CreateProfessorScoreDto } from "@/models/professorScore.model";
import StaticScoreBubble from "@/shared/components/StaticScoreBubble";
import StaticSideBarBubble from "@/shared/components/StaticSideBarBubble";
import { useEffect, useState } from "react";

interface ProfessorScoreCardProps {
  professorId: number;
}

const ProfessorScoreCard: React.FC<ProfessorScoreCardProps> = ({
  professorId,
}) => {
  const [professorScore, setProfessorScore] = useState<CreateProfessorScoreDto | null>(null);
  
  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      setProfessorScore(data as CreateProfessorScoreDto)
    });
  }, [professorId]);

  if (!professorScore) {
    return <></>
  }

  return (
    <>
      <StaticSideBarBubble title="">
        <div className="w-full flex justify-between">
          <StaticScoreBubble category="Teaching" score={professorScore.teachingScore} />
          <StaticScoreBubble category="Research" score={professorScore.researchScore} />
          <StaticScoreBubble category="Service" score={professorScore.serviceScore} />
        </div>
      </StaticSideBarBubble>
    </>
  );
};

export default ProfessorScoreCard;
