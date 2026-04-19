<div align="center">
  <br />
    <h3 align="center">Aura Drip App</h3>

    ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
    ![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
    ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
    ![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
    ![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
    ![](https://img.shields.io/badge/Radix_UI-6200EE?style=for-the-badge&logo=radix-ui&logoColor=white)
    <img src="/frontend/images/dashboard.jpg" alt="Project Banner">
    </a>
  <br />
</div>


# Aura Drip

Aura Drip is a full-stack wardrobe management and outfit recommendation app that
helps users organize their clothing, upload images, save favorites, and generate
outfit suggestions based on their own wardrobe. I built this project as a way to
strengthen my full-stack engineering skills while creating something practical,
visual, and user-focused.

**Frontend:** React + TypeScript + Vite  
**Backend:** Express + TypeScript + Prisma + PostgreSQL  
**Deployment:** Vercel (frontend) + Render (backend)

---
Why I Built This Project
I wanted a project that showed more than just isolated frontend work. Aura Drip gave me a chance to build something that feels like a real product while also stretching my backend, deployment, and debugging skills.
As a new CS graduate, I know I still have a lot to learn, but this project reflects how I like to work:
- build something practical
- solve real problems end-to-end
- improve the product after feedback
- keep learning through iteration
This is the kind of work I want to keep doing as I start my career in software engineering.
---
## Project Introduction

As a new computer science graduate, I wanted to build a project that felt closer to a real product than a tutorial app. Aura Drip started as an idea around fashion and personal organization, but it quickly became a way for me to practice full-stack development, authentication, file uploads, database design, protected APIs, deployment, and responsive frontend design.
The goal of the app is simple: give users a digital wardrobe where they can manage their clothing items and get outfit suggestions based on what they already own. Instead of relying on static sample data, the app stores user-specific items in a database and protects access through authentication.
This project was especially valuable for me because it forced me to work through real engineering problems such as:

- building authenticated CRUD routes
- handling user-specific data ownership
- connecting a deployed frontend and backend across different platforms
- configuring environment variables for local and production use
- debugging deployment issues related to Prisma, database URLs, and Supabase redirects
- improving mobile responsiveness after deployment
---
## Project Overview and Features

Aura Drip is a wardrobe organizer and outfit generator built around the idea of personalized fashion management.
A signed-in user can:

- create an account and sign in securely with Supabase Auth
- upload clothing items with images
- store item details such as category, color, style, occasion, and warmth
- browse their wardrobe in a searchable and filterable interface
- mark items as favorites
- edit or delete saved items
- generate outfit suggestions based on a natural language prompt
- view a profile page with wardrobe-related stats
---
### Core Features

#### 1. Authentication and Protected User Data

Users can create an account, confirm their email, sign in, and access only their own wardrobe data. The backend verifies Supabase JWTs and uses the authenticated user ID to scope all clothing records.

#### 2. Wardrobe Management

Users can add clothing items with:

- name
- category
- color
- style
- occasion
- warmth
- image upload
  They can also:
- search by item name
- filter by category
- sort alphabetically
- update existing items
- delete items

#### 3. Favorites

Users can favorite clothing items and view them in a dedicated favorites page. Favorite state is persisted in the database rather than stored only in local UI state.

#### 4. Outfit Generator

Users can enter prompts such as:

- "Give me a warm formal outfit for today"
- "I want something casual for the weekend"
- "Create a business outfit using my favorites"
  The backend reads the prompt, extracts styling preferences, scores available items, and returns a generated outfit plus reasoning for why those pieces were selected.

#### 5. Image Uploads

Clothing images are uploaded to Supabase Storage and then saved with a public image URL in the database, allowing each wardrobe item to have its own image.

#### 6. Responsive UI

The interface was designed and later refined for mobile responsiveness. This includes:

- a mobile-friendly layout
- improved card sizing
- a sticky bottom navigation experience on smaller screens
- resized image sections for a better mobile dashboard experience
---
## Tech Stack, APIs, and Other Resources
### Frontend
- React 19
- HTML
- CSS
- TypeScript
- Vite
- React Router
- Supabase JavaScript Client
- Framer Motion / Motion
### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JOSE
### Database and Storage
- Supabase PostgreSQL
- Supabase Storage
### Authentication
- Supabase Auth
- JWT verification on the backend using Supabase JWKS
---
Future Improvements
- User page delete account functionality
- A live responsive drip inspo api that will change daily
- Suggestion can match the current weather
- Allow the user to favorite the outgit recommended for them and be able to save
  it in the database
- User profile photo functionality

Supabase Auth Redirects
For email confirmation links to work properly in both development and production, Supabase Auth URL settings need to include:
- the Vercel production URL
- localhost development URLs
This was one of the deployment issues I had to debug while building the project.
---
Challenges and What I Learned
This project taught me much more than just how to build a CRUD app.
1. Full-Stack Authentication Is More Than Login Forms
I learned how authentication affects both frontend and backend architecture. It is not enough to let users sign in on the client. The backend also has to verify tokens and enforce ownership of data.
2. Deployment Has Its Own Debugging Layer
Some of the most valuable lessons came after the app worked locally. I had to troubleshoot:
- missing production environment variables
- incorrect redirect URLs
- Prisma migration deployment
- the difference between a Supabase project URL and a database connection string
- session pooler vs direct PostgreSQL connection
- frontend/backend communication across Vercel and Render
3. Product Polish Matters
I spent time revisiting mobile responsiveness, card sizing, navigation, and UI density. That process reminded me that shipping a feature is only part of the job. Making it feel usable and polished is just as important.
4. I Became More Comfortable Owning Problems End-to-End
This project helped me grow beyond writing isolated components. I had to think through:
- the data model
- request validation
- user flows
- deployment environments
- debugging production issues
- UX improvements after real usage
That end-to-end ownership is one of the things I wanted this project to demonstrate as I work toward an entry-level software engineering role.
---
Future Improvements
Some features I would like to add next:
- better weather-aware outfit recommendations
- stronger prompt parsing and recommendation logic
- saved generated outfits
- user profile editing
- drag-and-drop image uploads
- tests for backend routes and frontend components
- code splitting and bundle optimization
- admin/dev tooling for easier dataset and image inspection
---
How to Contribute and Report Issues
This project is primarily a portfolio project, but feedback is always welcome!
If you’d like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request with a clear description
If you find a bug or have a feature suggestion:
- open a GitHub issue
- include clear reproduction steps if possible
- include screenshots or logs when relevant
I appreciate thoughtful feedback, especially around:
- code quality
- UX improvements
- architecture decisions
- backend validation and security
- deployment best practices
