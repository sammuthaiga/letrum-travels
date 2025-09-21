Vercel deployment instructions (frontend)

Overview
- This repository contains a monorepo with `backend/` and `frontend/` folders.
- We'll deploy the frontend to Vercel and name the project: "Letrum Agecy staging".

Files added:
- `frontend/.env.example` - sample env vars for local/staging
- `vercel.json` - monorepo config (if present)

Checklist
1. Install Vercel CLI locally (optional, can use UI):
   npm i -g vercel

2. From the repository root, create a new Vercel project and link it:
   vercel --scope <your-team-or-username>

3. When prompted, set the project root to `frontend` (or use the command below to force it):
   vercel --prod --confirm --name "letrum-agecy-staging" --cwd frontend

4. Set environment variables (either via Vercel dashboard or CLI):
   vercel env add NEXT_PUBLIC_API_URL production
   vercel env add NEXT_PUBLIC_API_URL preview
   vercel env add NEXT_PUBLIC_API_URL development

   Or use the dashboard: Project → Settings → Environment Variables → Add

5. Build & Deploy
   - Vercel will run `npm install` then `npm run build` in the `frontend` folder and deploy.

6. Share the deployment URL with the client after successful deploy.

Notes
- The frontend expects an API base URL in `NEXT_PUBLIC_API_URL` (default in `.env.example`).
- If you prefer automatic preview deployments, connect your GitHub repo to Vercel and allow preview branches.
- To set the project name exactly as requested use the `--name` flag; the human-facing team name can be changed in project settings.

Commands (copy-paste)
```bash
npm i -g vercel
# login once
vercel login
# from repo root, link/create project, forcing frontend as root and name
vercel --name "Letrum Agecy staging" --cwd frontend
# add an env var (example):
vercel env add NEXT_PUBLIC_API_URL preview
# trigger a production deploy
vercel --prod --cwd frontend --confirm --name "Letrum Agecy staging"
```
