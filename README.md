# PaperBrief 📚

An AI-powered research paper assistant that helps you find and summarize academic papers — built for students and researchers who are tired of reading through dozens of abstracts manually.

## Live Demo

- **Frontend:** https://paperbrief-rag.vercel.app
- **Backend:** https://paperbrief-backend.onrender.com

> Note: Backend is hosted on Render's free tier and may take 30-60 seconds to wake up on first request.

## Problem

Finding relevant research papers is time-consuming. You search a topic, get flooded with results, and spend hours reading abstracts just to figure out which papers are actually worth reading.

## Solution

PaperBrief lets you search for papers by topic and generates a 5-point AI summary for each one — covering the problem, method, findings, limitations, and use case — along with a relevance score and a one-line plain English summary.

## Features

- 🔍 Search papers by topic using OpenAlex API (200M+ papers)
- 🤖 AI summarization — 5 bullet points + one-liner for any paper
- 📊 Relevance score (1–10) for each paper
- 🔗 Direct links to papers
- 🔐 JWT-based authentication

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| AI | Groq API (llama-3.3-70b-versatile) |
| Papers | OpenAlex API |
| Auth | JWT (jsonwebtoken, bcryptjs) |
| Deployment | Vercel (frontend), Render (backend) |

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
# Fill in your values in .env
node src/server.js
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Fill in your values in .env
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