import { getProfessorScoreForUser, updateProfessorScoreForUser } from '@/client/professorScore.client';
import Button from '@/shared/components/Button';
import React, { useState } from 'react';

interface ProfessorCommentBoxProps {
  professorId: number
}

const ProfessorCommentBox: React.FC<ProfessorCommentBoxProps> = ({ professorId }) => {
  const [comment, setComment] = useState('');

  const saveComment = () => {
    updateProfessorScoreForUser({userId: professorId, comment: comment}).then((res) => {})
  }

  return (
    <div className="flex flex-col rounded-lg w-full border-2">
      <div className="flex flex-col text-body p-1">
        <textarea
          className="w-full h-40 rounded-lg p-2 pb-0 outline-transparent resize-none focus:outline-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className='flex w-full items-center justify-center p-2'>
        <Button onClick={saveComment}>Save</Button>
      </div>
    </div>
  );
};

export default ProfessorCommentBox;
