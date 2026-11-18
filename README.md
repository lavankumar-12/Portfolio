# Lavan Kumar – Full Stack Developer Portfolio & Admin CMS

Organized into two clean, independently deployable directories:
- **`frontend/`** — React 18 + Vite + Tailwind CSS + Framer Motion (Deploy to **Vercel**)
- **`backend/`** — Node.js + Express + Mongoose / MongoDB Atlas REST API (Deploy to **Render** or **Railway**)

---

## 📁 Folder Structure

```
webportfolio/
├── frontend/                  # Frontend React App (Vercel Root Directory: frontend)
│   ├── public/                # Static favicon, robots.txt, sitemap, default resume PDF
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Reusable UI + Admin CMS managers
│   │   ├── context/           # ThemeContext & PortfolioContext
│   │   ├── data/              # Fallback portfolio data
│   │   ├── pages/             # AdminPage (/admin)
│   │   ├── sections/          # Hero, About, Skills, Projects, Experience, Certifications, etc.
│   │   └── services/          # Centralized API client (uses VITE_API_URL)
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── backend/                   # Express + MongoDB Atlas API (Render Root Directory: backend)
│   ├── config/                # MongoDB Atlas connection
│   ├── middleware/            # JWT admin authentication
│   ├── models/                # Profile, Skill, Project, Experience, Certificate, Achievement, CodingProfile, Message
│   ├── routes/                # Full CRUD + visibility toggle + image/PDF upload routes
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── .gitignore
└── README.md
```

---

## 💻 Run Locally

Open two terminals:

**Terminal 1 – Backend (`http://localhost:5000`):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 – Frontend (`http://localhost:3000`):**
```bash
cd frontend
npm install
npm run dev
```

- **Portfolio:** `http://localhost:3000/`
- **Admin Dashboard:** `http://localhost:3000/admin`

---

## ☁️ Easy Deployment Guide

### Step 1: Deploy `backend/` to Render (or Railway)
1. Push this repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) connected to your GitHub repo.
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables in Render:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `ADMIN_EMAIL` = your admin login email
   - `ADMIN_PASSWORD` = your strong admin password
   - `JWT_SECRET` = a long random secret string
   - `CLIENT_URL` = your Vercel frontend URL (e.g., `https://your-portfolio.vercel.app`)
5. Copy your deployed backend URL (e.g., `https://lavan-portfolio-api.onrender.com`).

### Step 2: Deploy `frontend/` to Vercel
1. Import the same GitHub repo on [Vercel](https://vercel.com).
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add Environment Variable in Vercel:
   - `VITE_API_URL` = `https://lavan-portfolio-api.onrender.com` (no trailing slash)
4. Click **Deploy**!
5. Update `CLIENT_URL` in Render with your live Vercel URL so CORS allows your domain.
