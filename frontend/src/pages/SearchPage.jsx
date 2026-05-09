import { useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import PaperCard from '../components/PaperCard';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setPapers([]);
        setSearched(true);

        try {
            const res = await api.get(`/api/search?q=${encodeURIComponent(query)}`);
            setPapers(res.data.papers);
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10">
                {/* heading */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Find Research Papers
                </h1>
                <p className="text-gray-500 mb-8">
                    Search any topic and summarize papers with AI
                </p>

                {/* search bar */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. transformer architecture, federated learning..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {/* error */}
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                {/* loading state */}
                {loading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-lg p-5 animate-pulse"
                            >
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* no results */}
                {!loading && searched && papers.length === 0 && !error && (
                    <p className="text-gray-500 text-sm text-center mt-10">
                        No papers found for "{query}". Try a different search term.
                    </p>
                )}

                {/* results */}
                {!loading && papers.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">
                            {papers.length} papers found
                        </p>
                        {papers.map((paper) => (
                            <PaperCard key={paper.paperId} paper={paper} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;