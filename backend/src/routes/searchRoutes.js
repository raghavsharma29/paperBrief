const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

// protected — user must be logged in to search
router.get('/', authMiddleware, search);

module.exports = router;