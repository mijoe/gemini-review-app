
import React from 'react';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-20 bg-gray-700 rounded mt-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mt-6"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
    </div>
);


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Review Feedback</h2>
      <div className="bg-gray-800 rounded-lg border border-gray-700 min-h-[200px] p-4 md:p-6 shadow-lg">
        {isLoading && <SkeletonLoader />}
        {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md border border-red-700">{error}</div>}
        {!isLoading && !error && !review && (
            <div className="text-gray-500 flex flex-col items-center justify-center h-full text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Your code review will appear here.
            </div>
        )}
        {review && (
           <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMarkdown(review) }} />
        )}
      </div>
    </div>
  );
};


// A simple function to format basic markdown elements to HTML for display
function formatMarkdown(text: string): string {
    let html = text
    // Escape HTML to prevent XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

    // Bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
    
    // Code blocks (```lang\ncode\n```)
    html = html.replace(/```(\w*?)\n([\s\S]*?)```/g, (match, lang, code) => {
        const languageLabel = lang ? `<div class="text-xs text-gray-400 pb-1">${lang}</div>` : '';
        return `<div class="bg-gray-900 p-3 my-4 rounded-md border border-gray-600 overflow-x-auto"><pre><code>${code.trim()}</code></pre></div>`;
    });

    // Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-cyan-400 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');

    // Headers (e.g., # Header, ## Header)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-6 mb-3 border-b border-gray-600 pb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-8 mb-4 border-b border-gray-600 pb-2">$1</h1>');
    
    // Unordered lists (* item or - item)
    html = html.replace(/^\s*([*-]) (.*)/gim, '<li class="ml-6 mb-1">$2</li>');
    html = html.replace(/<\/li>\n<li/g, '</li><li'); // Fix spacing
    html = html.replace(/(<li.*<\/li>)/gs, '<ul class="list-disc pl-5 my-3">$1</ul>');

    // Ordered lists (1. item)
    html = html.replace(/^\s*\d+\. (.*)/gim, '<li class="ml-6 mb-1">$1</li>');
    html = html.replace(/(<li.*<\/li>)/gs, (match) => {
        if(match.includes('<ul')) return match; // Avoid wrapping lists in lists
        return '<ol class="list-decimal pl-5 my-3">$1</ol>';
    });

    return html;
}
