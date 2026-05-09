const express = require('express');
const router = express.Router();
const { search, summarize } = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, search);
router.post('/summarize', authMiddleware, summarize);

module.exports = router;