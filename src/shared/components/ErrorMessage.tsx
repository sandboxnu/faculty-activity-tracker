import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => {
  return (
    <p className="mt-20 w-full text-center text-body-bold text-red-500">
      Error: {message || 'Unknown Error'}
    </p>
  );
};

export default ErrorMessage;
