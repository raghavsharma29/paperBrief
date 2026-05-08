const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// --- Middleware ---

app.use(cors());

app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'PaperBrief API is running' });
});

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// --- Start Server ---
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

require('./models/User');
require('./models/SavedPaper');
console.log('Models loaded successfully');