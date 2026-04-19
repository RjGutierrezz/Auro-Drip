<div align="center">
  <h1>Aura Drip</h1>
  <p>
    A full-stack wardrobe management and outfit recommendation app built with React, Express, Prisma, PostgreSQL, and Supabase.
  </p>

  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript badge" />
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React badge" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite badge" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express badge" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma badge" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase badge" />
  </p>

  <img src="./frontend/public/images/dashboard.jpg" alt="Aura Drip dashboard preview" width="900" />
</div>

## Table Of Contents

1. [Project Introduction](#project-introduction)
2. [Project Overview And Features](#project-overview-and-features)
3. [Tech Stack, APIs, And Other Resources](#tech-stack-apis-and-other-resources)
4. [Getting Started: Setup And Running Instructions](#getting-started-setup-and-running-instructions)
5. [Deployment Notes](#deployment-notes)
6. [Challenges And What I Learned](#challenges-and-what-i-learned)
7. [Future Improvements](#future-improvements)
8. [How To Contribute And Report Issues](#how-to-contribute-and-report-issues)

## Project Introduction

Aura Drip is a personal full-stack project I built to practice shipping a product that feels closer to a real application than a classroom exercise or tutorial clone. The idea was to create a digital wardrobe where users can upload their own clothing, organize it in one place, favorite pieces they wear most often, and generate outfit suggestions based on what they already own.

As a new computer science graduate working toward an entry-level software engineering role, I wanted this project to show more than isolated frontend components. I wanted it to demonstrate that I can think through the full product lifecycle: database design, authentication, protected API routes, file uploads, deployment, debugging production issues, and iterative UI improvements.

This project pushed me to solve real engineering problems such as:
- designing a user-scoped data model for wardrobe items
- building authenticated CRUD routes with request validation
- connecting a Vercel frontend to a Render backend
- working with Supabase Auth and Supabase Storage
- debugging Prisma migration and database connection issues in production
- revisiting UI density and mobile responsiveness after deployment

## Project Overview And Features

Aura Drip is centered around personalized wardrobe management. Instead of recommending outfits from a generic catalog, the app works with the clothing a user has personally uploaded.

A signed-in user can:
- create an account and confirm their email
- sign in securely with Supabase Auth
- upload clothing images to Supabase Storage
- save item details such as category, color, style, occasion, and warmth
- browse a searchable and filterable wardrobe
- favorite items for faster access later
- edit or delete existing items
- generate outfit suggestions based on a natural language prompt
- view wardrobe-related counts on the dashboard and profile page

### Core Features

#### 1. Authentication And Protected User Data

Users can create an account, sign in, and access only their own clothing data. On the backend, Supabase JWTs are verified before protected routes are allowed to access wardrobe records. Every clothing item is tied to a specific `userId`, which prevents one user from reading or modifying another user's data.

#### 2. Wardrobe Management

Users can create clothing items with the following attributes:
- name
- category
- color
- style
- occasion
- warmth
- image URL

Once an item is created, the user can:
- search by item name
- filter by category
- sort alphabetically
- update item information
- delete an item from the database

#### 3. Favorites

The app allows users to favorite wardrobe items and view them in a dedicated favorites page. Favorite state is stored in the database rather than only in local UI state, which makes the experience persistent across sessions.

#### 4. Outfit Generator

Users can type prompts such as:
- `Give me a warm formal outfit for today`
- `I want something casual for the weekend`
- `Create a business outfit using my favorites`

The backend reads the prompt, extracts useful styling preferences, scores available wardrobe items, and returns a generated outfit with a short explanation of why those items were chosen.

#### 5. Image Uploads

Clothing images are uploaded to the `clothing-images` bucket in Supabase Storage. After upload, the public image URL is saved in PostgreSQL through Prisma so each clothing item has a stored image reference.

#### 6. Responsive UI

The interface was designed and later refined for mobile responsiveness. Recent updates included:
- a mobile-first layout pass
- smaller and more balanced dashboard cards on phones
- a sticky bottom tab bar for mobile navigation
- better control spacing on wardrobe and favorites pages
- more consistent card sizing between wardrobe and favorite views

## Tech Stack, APIs, And Other Resources

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Supabase JavaScript Client
- Framer Motion / Motion
- CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JOSE

### Database And Storage
- Supabase PostgreSQL
- Supabase Storage

### Authentication
- Supabase Auth
- JWT verification on the backend using Supabase JWKS

### Deployment
- Vercel for the frontend
- Render for the backend

## Getting Started: Setup And Running Instructions

### Prerequisites

Before running the project locally, make sure you have:
- Node.js installed
- npm installed
- a Supabase project
- a PostgreSQL connection string
- Git installed

### 1. Clone The Repository

```bash
git clone https://github.com/RjGutierrezz/Aura-Drip.git
cd aura-drip
```

### 2. Install Dependencies

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:4000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `backend/.env` file:

```env
DATABASE_URL=your_postgres_connection_string
SUPABASE_URL=your_supabase_project_url
```

Notes:
- `SUPABASE_URL` should look like `https://your-project.supabase.co`
- `DATABASE_URL` must be a PostgreSQL connection string, not the Supabase project URL
- for hosted environments like Render, the Supabase session pooler connection string worked more reliably than the direct database URL

### 4. Run Prisma Migrations

From the `backend` directory:

```bash
npx prisma migrate deploy
npx prisma generate
```

For local development, you can also use:

```bash
npx prisma migrate dev
```

### 5. Run The Backend

From the `backend` directory:

```bash
npm run dev
```

The backend runs on `http://localhost:4000`.

### 6. Run The Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Deployment Notes

The project is deployed as two separate services:
- `frontend/` on Vercel
- `backend/` on Render

### Frontend Environment Variables

Vercel needs:
- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend Environment Variables

Render needs:
- `DATABASE_URL`
- `SUPABASE_URL`

### Render Build Notes

The backend required Prisma generation and migration deployment during the build process:

```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

One deployment issue I had to work through was that the direct Supabase PostgreSQL connection did not work properly from Render. Switching to the Supabase session pooler fixed the network reachability problem.

### Supabase Auth Redirect Notes

Email confirmation links needed to be updated so they pointed to the production Vercel deployment rather than localhost. This involved configuring Supabase Auth URL settings and allowed redirect URLs for both local development and production.

## Challenges And What I Learned

This project taught me much more than just how to build a CRUD app.

### 1. Full-Stack Authentication Is More Than Login Forms

I learned that authentication affects both frontend and backend architecture. It is not enough to let users sign in on the client. The backend also has to verify tokens and enforce ownership of data.

### 2. Deployment Has Its Own Debugging Layer

Some of the most valuable lessons came after the app worked locally. I had to troubleshoot:
- missing production environment variables
- incorrect Supabase redirect URLs
- Prisma migration deployment
- the difference between a Supabase project URL and a database connection string
- session pooler vs direct PostgreSQL connection
- frontend/backend communication across Vercel and Render

### 3. Product Polish Matters

I spent time revisiting mobile responsiveness, card sizing, navigation, and UI density. That process reminded me that shipping a feature is only part of the job. Making it feel usable and polished is just as important.

### 4. I Became More Comfortable Owning Problems End-To-End

This project helped me grow beyond isolated components. I had to think through:
- the data model
- request validation
- user flows
- deployment environments
- production debugging
- iterative UX improvements after real testing

That end-to-end ownership is one of the main things I wanted this project to demonstrate as I work toward an entry-level software engineering role.

## Future Improvements

Some features I would like to add next:
- delete account functionality on the user page
- better weather-aware outfit recommendations
- stronger prompt parsing and recommendation logic
- saved generated outfits
- user profile photo support
- drag-and-drop image uploads
- automated tests for backend routes and frontend components
- code splitting and bundle optimization

## How To Contribute And Report Issues

This project is primarily a portfolio project, but feedback is always welcome.

If you would like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request with a clear explanation of what changed

If you find a bug or want to suggest an improvement:
- open a GitHub issue
- include reproduction steps if possible
- include screenshots or logs when relevant

I especially appreciate feedback around:
- code quality
- UI and UX improvements
- architecture decisions
- backend validation and security
- deployment and production-readiness
