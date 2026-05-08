# PaperBrief 📚

An AI-powered research paper assistant that helps you find, summarize, and organize academic papers — built for students and researchers who are tired of reading through dozens of abstracts manually.

## Problem

Finding relevant research papers is time-consuming. You search a topic, get flooded with results, and spend hours reading abstracts just to figure out which papers are actually worth reading.

## Solution

PaperBrief lets you search for papers by topic, generates a 5-point AI summary for each one, scores its relevance to your query, and lets you save papers with your own notes for future reference.

## Features

- 🔍 Search papers by topic using Semantic Scholar API
- 🤖 AI summarization — get 5 bullet points + a one-liner for any paper
- 📊 Relevance score (1–10) for each paper
- 📁 Personal library — save papers with your own notes
- 📄 Export your library as a formatted text file
- 🔐 JWT-based authentication — every user has their own library

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| AI | Groq API (llama-3.3-70b-versatile) |
| Papers | Semantic Scholar API |
| Auth | JWT (jsonwebtoken, bcryptjs) |

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### Backend

```bash
cd backend
npm install
cp .env.example .env
node src/server.js
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

**backend/.env.example**

PORT=5000
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=

**frontend/.env.example**
VITE_API_URL=http://localhost:5000

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/search?q= | Search papers | Yes |
| POST | /api/search/summarize | AI summarize a paper | Yes |
| GET | /api/library | Get saved papers | Yes |
| POST | /api/library | Save a paper | Yes |
| PATCH | /api/library/:id | Update note | Yes |
| DELETE | /api/library/:id | Remove paper | Yes |