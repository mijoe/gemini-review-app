
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center space-x-3">
        <CodeIcon className="w-8 h-8 text-cyan-400" />
        <div>
            <h1 className="text-xl font-bold text-gray-100">Gemini Code Reviewer</h1>
            <p className="text-sm text-gray-400">Get expert AI-powered feedback on your code.</p>
        </div>
      </div>
    </header>
  );
};
