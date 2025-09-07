import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-5/6"></div>
      </div>
    </div>
  );
};