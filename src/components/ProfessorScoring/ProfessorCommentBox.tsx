import { ResponseStatus } from '@/client/activities.client';
import {
  getProfessorScoreForUser,
  updateProfessorScoreForUser,
} from '@/client/professorScore.client';
import { CreateProfessorScoreDto } from '@/models/professorScore.model';
import React, { useEffect, useState } from 'react';

interface ProfessorCommentBoxProps {
  professorId: number;
}

const ProfessorCommentBox: React.FC<ProfessorCommentBoxProps> = ({
  professorId,
}) => {
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(true);
  const [professorScore, setProfessorScore] = useState<CreateProfessorScoreDto | null>(null);

  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      setProfessorScore(data as CreateProfessorScoreDto)
      setComment((data as CreateProfessorScoreDto).comment)
    });
  }, [professorId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setSaved(false);
  };

  const saveComment = async () => {
    try {
      const response = await updateProfessorScoreForUser({ userId: professorId, comment: comment });
      if (response === ResponseStatus.Success) {
        setSaved(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (!saved) {
        saveComment();
      }
    }, 3000);

    return () => {
      clearInterval(saveInterval);
    };
  }, [comment, saved]);

  return (
    <div className="flex flex-col rounded-lg w-full border-2">
      <div className="flex flex-col text-body p-1">
        <textarea
          className="w-full h-40 rounded-lg p-2 pb-0 outline-transparent resize-none focus:outline-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="flex w-full items-center justify-center pb-2 text-body">
        {saved ? "Saved" : "Saving..."}
      </div>
    </div>
  );
};

export default ProfessorCommentBox;
