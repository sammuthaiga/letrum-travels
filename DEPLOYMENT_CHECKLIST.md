# 📋 Render Deployment Checklist

## Pre-Deployment
- [ ] Code committed to Git
- [ ] Pushed to GitHub/GitLab
- [ ] Environment files created
- [ ] Build scripts tested locally

## Database Deployment
- [ ] Created PostgreSQL database on Render
- [ ] Saved database URL
- [ ] Database is running

## Backend Deployment
- [ ] Created web service for backend
- [ ] Set root directory to `backend`
- [ ] Added all environment variables
- [ ] Build command: `npm install && npm run build && npx prisma generate`
- [ ] Start command: `npm run start:prod`
- [ ] Deployment successful
- [ ] Health check working: `/api/v1/health`
- [ ] API docs accessible: `/api/docs`

## Database Setup
- [ ] Run `npx prisma migrate deploy` in backend shell
- [ ] Run `npx prisma db seed` in backend shell
- [ ] Verify seed data loaded

## Frontend Deployment
- [ ] Created web service for frontend
- [ ] Set root directory to `frontend`
- [ ] Added environment variables
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Deployment successful
- [ ] Frontend loads correctly

## Final Verification
- [ ] User registration works
- [ ] User login works
- [ ] API calls from frontend work
- [ ] All pages load correctly
- [ ] CORS configured properly

## Optional Enhancements
- [ ] Custom domain configured
- [ ] Performance monitoring setup
- [ ] Database backup configured
- [ ] Error tracking setup

---

## Quick Links
- **Render Dashboard**: https://dashboard.render.com
- **Deployment Guide**: See `RENDER_DEPLOYMENT_GUIDE.md`
- **Troubleshooting**: Check backend/frontend logs in Render dashboard
