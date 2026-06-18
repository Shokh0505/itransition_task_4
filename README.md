# Itransition Task 4 — User Management App

A full-stack user management web application built with Next.js, Express, and PostgreSQL. Supports user registration with email verification, and an authenticated dashboard to manage users (block, unblock, delete).

## Features

- User registration with real-time email verification (via [Resend](https://resend.com))
- JWT-based authentication
- User dashboard: block, unblock, and delete users
- Only verified users can access the dashboard

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | Next.js (App Router)        |
| Backend  | Node.js / Express           |
| Database | PostgreSQL                  |
| Email    | Resend                      |
| Deploy   | Railway                     |

## Project Structure

```
itransition-task4/
├── frontend/   # Next.js app
└── backend/    # Express API
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Resend account + API key

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   JWT_SECRET=your_jwt_secret
   BASE_URL=https://your-backend-url.com
   NODE_ENV=development
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com/api
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables Reference

### Backend

| Variable       | Description                          |
|----------------|--------------------------------------|
| `PORT`         | Port the Express server listens on   |
| `DATABASE_URL` | PostgreSQL connection string         |
| `JWT_SECRET`   | Secret key for signing JWTs          |
| `BASE_URL`     | Public URL of the backend (used in email verification links) |
| `NODE_ENV`     | `development` or `production`        |
| `RESEND_API_KEY` | API key from Resend for sending emails |

### Frontend

| Variable                  | Description                     |
|---------------------------|---------------------------------|
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the backend API     |

## Deployment

Both frontend and backend are deployed on [Railway](https://railway.app). Set the environment variables above in each Railway service's settings.
