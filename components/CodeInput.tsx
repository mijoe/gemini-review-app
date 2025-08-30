
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './LoadingSpinner';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  onCodeChange,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label htmlFor="language-select" className="text-sm font-medium text-gray-300">
                Select Language:
            </label>
            <select
                id="language-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 w-full sm:w-auto"
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                    {lang.label}
                </option>
                ))}
            </select>
        </div>
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-64 p-3 bg-gray-900 text-gray-200 font-mono text-sm rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-y"
          spellCheck="false"
        />
      </div>
      <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-end rounded-b-lg">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="w-5 h-5 mr-2" />
              Reviewing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};
