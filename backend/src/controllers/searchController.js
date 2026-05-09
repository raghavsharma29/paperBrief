const { searchPapers } = require('../utils/scholarAPI');

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

module.exports = { search };