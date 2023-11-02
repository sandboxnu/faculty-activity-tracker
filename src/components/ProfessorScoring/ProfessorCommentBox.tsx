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

const SavedButton: React.FC<{
  width?: number;
  height?: number;
  fillColor?: string;
  className?: string;
}> = ({ width = 13, height = 13, fillColor = '#8C8C8C', className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.5 0.25C9.95187 0.25 12.75 3.04813 12.75 6.5C12.75 9.95187 9.95187 12.75 6.5 12.75C3.04813 12.75 0.25 9.95187 0.25 6.5C0.25 3.04813 3.04813 0.25 6.5 0.25ZM6.5 11.5C7.82608 11.5 9.09785 10.9732 10.0355 10.0355C11.5001 9.09785 11.5 7.82608 11.5 6.5C11.5 5.17392 10.9732 3.90215 10.0355 2.96447C9.09785 2.02678 7.82608 1.5 6.5 1.5C5.17392 1.5 3.90215 2.02678 2.96447 2.96447C2.02678 3.90215 1.5 5.17392 1.5 6.5C1.5 7.82608 2.02678 9.09785 2.96447 10.0355C3.90215 10.9732 5.17392 11.5 6.5 11.5ZM5.87687 9L4.10875 7.2325L3.225 6.34812L4.10875 5.46437L5.87687 7.2325L9.4125 3.69687L10.2962 4.58062L5.87687 9Z"
      fill={fillColor}
    />
  </svg>
);

const ProfessorCommentBox: React.FC<ProfessorCommentBoxProps> = ({
  professorId,
}) => {
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(true);
  const [professorScore, setProfessorScore] =
    useState<CreateProfessorScoreDto | null>(null);

  useEffect(() => {
    getProfessorScoreForUser(professorId).then((data) => {
      setProfessorScore(data as CreateProfessorScoreDto);
      setComment((data as CreateProfessorScoreDto).comment);
    });
  }, [professorId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setSaved(false);
  };

  const saveComment = async () => {
    try {
      const response = await updateProfessorScoreForUser({
        userId: professorId,
        comment: comment,
      });
      if (response === ResponseStatus.Success) {
        setSaved(true);
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
    }, 750); // Change this value to change the time interval for saving the comment

    return () => {
      clearInterval(saveInterval);
    };
  }, [saveComment, saved]);

  return (
    <div className="flex w-full flex-col rounded-lg border-2">
      <div className="flex flex-col p-1 text-body">
        <textarea
          className="h-32 w-full resize-none rounded-lg p-2 pb-0 outline-transparent focus:outline-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="flex items-center space-x-1 p-4 pb-2 pt-0">
        <p className="text-body-bold text-gray-400">
          {saved ? 'Saved' : 'Saving...'}
        </p>
        {saved && <SavedButton />}
      </div>
    </div>
  );
};

export default ProfessorCommentBox;
