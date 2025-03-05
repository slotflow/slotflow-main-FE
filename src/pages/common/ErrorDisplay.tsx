import React from 'react';

interface ErrorDisplayProps {
  statusCode: number;
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ statusCode, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
          {statusCode ? statusCode : "404" }
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{message ? message : "Unexpected Error"}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Oops! Something went wrong.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;