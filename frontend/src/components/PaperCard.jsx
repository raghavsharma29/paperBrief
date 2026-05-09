import { useState } from 'react';
import api from '../utils/api';

const relevanceBadgeColor = (score) => {
  if (score >= 8) return 'bg-green-100 text-green-700';
  if (score >= 5) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const PaperCard = ({ paper }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/search/summarize', {
        title: paper.title,
        abstract: paper.abstract
      });
      setSummary(res.data);
    } catch (err) {
      setError('Failed to generate summary. Try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-1">
        {paper.title}
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        {paper.authors.slice(0, 3).join(', ')}
        {paper.authors.length > 3 && ' et al.'}
        {paper.year && ` · ${paper.year}`}
      </p>
      {paper.abstract && (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {paper.abstract.slice(0, 200)}
          {paper.abstract.length > 200 && '...'}
        </p>
      )}
      <div className="flex items-center gap-3 mb-4">
        {paper.url && (
          <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            View Paper
          </a>
        )}
        {!summary && (
          <button onClick={handleSummarize} disabled={loading} className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Summarizing...' : 'Summarize with AI'}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
      {summary && (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mt-2">
          <p className="text-sm italic text-gray-600 mb-3">{summary.oneLiner}</p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${relevanceBadgeColor(summary.relevanceScore)}`}>
            Relevance: {summary.relevanceScore}/10
          </span>
          <ul className="mt-3 space-y-2">
            {summary.summary.map((point, index) => (
              <li key={index} className="text-sm text-gray-700 flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaperCard;