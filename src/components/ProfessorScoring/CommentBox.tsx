import Button from '@/shared/components/Button';
import React, { useState } from 'react';

interface CommentBoxProps {
  saveComment: () => void;
}

const SavedButton: React.FC<{
  width?: number;
  height?: number;
  fillColor?: string;
  className?: string;
}> = ({ width = 13, height = 13, fillColor = '#585858', className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.5 0.25C9.95187 0.25 12.75 3.04813 12.75 6.5C12.75 9.95187 9.95187 12.75 6.5 12.75C3.04813 12.75 0.25 9.95187 0.25 6.5C0.25 
      3.04813 3.04813 0.25 6.5 0.25ZM6.5 11.5C7.82608 11.5 9.09785 10.9732 10.0355 10.0355C11.5001 9.09785 11.5 7.82608 11.5 6.5C11.5 
      5.17392 10.9732 3.90215 10.0355 2.96447C9.09785 2.02678 7.82608 1.5 6.5 1.5C5.17392 1.5 3.90215 2.02678 2.96447 2.96447C2.02678 
      3.90215 1.5 5.17392 1.5 6.5C1.5 7.82608 2.02678 9.09785 2.96447 10.0355C3.90215 10.9732 5.17392 11.5 6.5 11.5ZM5.87687 9L4.10875 
      7.2325L3.225 6.34812L4.10875 5.46437L5.87687 7.2325L9.4125 3.69687L10.2962 4.58062L5.87687 9Z"
      fill={fillColor}
    />
  </svg>
);

const CommentBox: React.FC<CommentBoxProps> = ({ saveComment }) => {
  const [comment, setComment] = useState('');

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
        <Button onClick={saveComment} addOnClass='h-[20px]'>Save</Button>
      </div>
    </div>
  );
};

export default CommentBox;
