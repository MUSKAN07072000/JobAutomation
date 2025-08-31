
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">AI Job Agent</h1>
      {/* Add user profile/actions here if needed */}
    </header>
  );
};
