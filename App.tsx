
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].value);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview('');
    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="space-y-8">
          <CodeInput
            code={code}
            onCodeChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
            onSubmit={handleReview}
            isLoading={isLoading}
          />
          <ReviewOutput review={review} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
