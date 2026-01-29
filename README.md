# E‑Commerce (Next.js + Express + MongoDB)

## Overview
Full‑stack e‑commerce scaffold:
- Frontend: Next.js App Router + Tailwind
- Backend: Express + TypeScript (MongoDB with Mongoose)
- Dev tools: TypeScript, ESLint, seed script
- Deploy: Vercel (web) and Hugging Face Spaces (api)

## Local Setup
- Requirements: Node 18+, npm, Git
- Install:
  - In `web`: `npm install`
  - In `api`: `npm install`
- Environment:
  - Create `api/.env` using `api/.env.sample`
  - Set `MONGODB_URI` to your Atlas URI (with `/ecommerce`)
  - Set `JWT_SECRET`
- Run:
  - API: `npm run dev` in `api` (http://localhost:4000)
  - Web: `npm run dev` in `web` (http://localhost:3001)

## MongoDB Atlas
- Create cluster and DB user (read/write)
- Network Access: add your IP
- Connection string example:
  `mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/ecommerce?retryWrites=true&w=majority`
- Browse Collections → `ecommerce` → `products`

## Seed Data
- Seed file: `api/seed/products.json`
- Script: `api/src/seed.ts`
- Run: in `api` → `npm run seed:build`
- Verify: `http://localhost:4000/api/products`

## Frontend Config
- `web/next.config.mjs` allows remote images (`dummyimage.com`, `images.unsplash.com`)
- Env: `NEXT_PUBLIC_API_URL` (for Vercel) points to your API

## Backend Config
- `api/src/server.ts` exposes `/health` and `/api/products`
- CORS: configure allowed origins when deploying
- Dockerfile prepared for Hugging Face Spaces (PORT=7860)

## Deploy (Vercel - Web)
- Import repo in Vercel
- Env: `NEXT_PUBLIC_API_URL=https://<your-space>.hf.space`
- Build & deploy; open Vercel URL

## Deploy (Hugging Face Spaces - API)
- Create Space (Docker)
- Upload `api` directory (includes Dockerfile)
- Variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY` (optional)
  - `PORT=7860`
- Test:
  - `/health`, `/api/products` on Space URL

## GitHub
- Initialize repo in project root and push:
  ```
  git init
  git remote add origin https://github.com/<your-user>/e-commerce.git
  git add .
  git commit -m "Initial project: web, api, seed, Docker"
  git branch -M main
  git push -u origin main
  ```

## Notes
- Do not commit `.env` (ignored)
- For production, restrict CORS to your Vercel domain(s)
- Add indexes for `category`, `price` as catalog grows

# ecommerce-backend
