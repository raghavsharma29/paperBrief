const { searchPapers } = require('../utils/scholarApi');
const { summarizePaper } = require('../utils/groqApi');

// GET /api/search?q=machine learning
const search = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const papers = await searchPapers(query.trim());
        res.json({ papers });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /api/search/summarize
const summarize = async (req, res) => {
    try {
        const { title, abstract } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const result = await summarizePaper(title, abstract);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { search, summarize };