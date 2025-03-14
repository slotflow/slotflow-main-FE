import { Error404 } from '@/components/svgs/Error404';
import React from 'react';

const ErrorDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Error404 />
    </div>
  );
};

export default ErrorDisplay;