import { ProfessorInfoDto } from '@/models/professorInfo.model';
import StaticSideBarBubble from '@/shared/components/StaticSideBarBubble';
import TextAreaInput from '@/shared/components/TextAreaInput';
import TextField from '@/shared/components/TextField';
import React, { useEffect, useState } from 'react';

interface SocringInfoProps {
  profInfo: ProfessorInfoDto | null;
}

const ScoringInfo: React.FC<SocringInfoProps> = ({ profInfo }) => {
  if (!profInfo) return <p> No info for this professor found. </p>;
  return (
    <>
      <StaticSideBarBubble title="Teaching Release">
        <div className="space-y-2 my-2">
          <p> {profInfo.teachingReleaseExplanation || 'N/A'}</p>
        </div>
      </StaticSideBarBubble>
      <StaticSideBarBubble title="Activity Rubric">
        <div className="space-y-2 my-2">
          <p> 8 significants = 1 major activity</p>
          <p> 4 significants = 1 minor activity</p>
        </div>
      </StaticSideBarBubble>
    </>
  );
};

export default ScoringInfo;
