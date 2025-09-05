# 🚀 Letrum Agency - Render Deployment Guide

## 📋 Deployment Summary

This guide will walk you through deploying your fullstack Letrum Travel Agency application on Render.

### 🏗️ Architecture Overview
- **Backend**: NestJS API with PostgreSQL database
- **Frontend**: Next.js application
- **Database**: PostgreSQL on Render
- **Hosting**: Render Web Services

---

## 🚀 Step-by-Step Deployment Process

### **Step 1: Prepare Git Repository**

1. **Commit all changes and push to GitHub:**
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### **Step 2: Deploy Database First**

1. **Login to [Render.com](https://render.com)**
2. **Create PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name: `letrum-agency-db`
   - Database: `letrum_agency`
   - User: `letrum_user`
   - Plan: Free (upgrade for production)
   - Region: Select closest to your users
   - Click "Create Database"

3. **Save Database Connection Details:**
   - Copy the **External Database URL** (you'll need this for backend)
   - Format: `postgresql://username:password@hostname:5432/database_name`

### **Step 3: Deploy Backend API**

1. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Service Name: `letrum-agency-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Region: Same as database
   - Branch: `main`

2. **Configuration:**
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm run start:prod`

3. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://[your-database-url-from-step-2]
   JWT_SECRET=letrum-super-secure-jwt-secret-key-2024-production
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   PORT=10000
   ```

4. **Deploy:** Click "Create Web Service"

### **Step 4: Setup Database Schema**

1. **After backend deployment completes:**
   - Go to your backend service dashboard
   - Click "Shell" tab
   - Run these commands:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

2. **Verify database setup:**
   ```bash
   npx prisma studio
   ```

### **Step 5: Deploy Frontend**

1. **Create Another Web Service:**
   - Click "New +" → "Web Service"
   - Connect same GitHub repository
   - Service Name: `letrum-agency-frontend`
   - Root Directory: `frontend`
   - Environment: `Node`
   - Region: Same as backend
   - Branch: `main`

2. **Configuration:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://letrum-agency-backend.onrender.com/api/v1
   ```
   (Replace with your actual backend URL)

4. **Deploy:** Click "Create Web Service"

### **Step 6: Update CORS Configuration**

1. **After both services deploy:**
   - Your frontend URL will be: `https://letrum-agency-frontend.onrender.com`
   - Update backend environment variables:
   ```
   FRONTEND_URL=https://letrum-agency-frontend.onrender.com
   ```

2. **Redeploy backend** for CORS changes to take effect

### **Step 7: Verify Deployment**

1. **Test Backend API:**
   - Health check: `https://letrum-agency-backend.onrender.com/api/v1/health`
   - API docs: `https://letrum-agency-backend.onrender.com/api/docs`

2. **Test Frontend:**
   - Visit: `https://letrum-agency-frontend.onrender.com`
   - Test user registration/login
   - Test API integration

---

## 🔧 Important Configuration Files

### **Backend Environment Variables**
```env
# Production Environment
DATABASE_URL=postgresql://letrum_user:password@hostname:5432/letrum_agency
JWT_SECRET=letrum-super-secure-jwt-secret-key-2024-production
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://letrum-agency-frontend.onrender.com
```

### **Frontend Environment Variables**
```env
# Production Environment
NEXT_PUBLIC_API_URL=https://letrum-agency-backend.onrender.com/api/v1
```

---

## 🎯 Post-Deployment Checklist

### **✅ Backend Verification**
- [ ] Health endpoint responding: `/api/v1/health`
- [ ] API documentation accessible: `/api/docs`
- [ ] Database connection working
- [ ] Authentication endpoints working
- [ ] All API routes responding correctly

### **✅ Frontend Verification**
- [ ] Homepage loads correctly
- [ ] User registration working
- [ ] User login working
- [ ] Dashboard accessible after login
- [ ] All service pages loading
- [ ] API calls working from frontend

### **✅ Database Verification**
- [ ] Prisma migrations applied
- [ ] Seed data loaded
- [ ] Tables created correctly
- [ ] Sample users can login

---

## 🚨 Troubleshooting Common Issues

### **Database Connection Issues**
```bash
# Check database connection in backend shell
npx prisma db pull
```

### **CORS Errors**
- Ensure frontend URL is added to backend CORS configuration
- Check environment variables are set correctly

### **Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for TypeScript errors

### **API Call Failures**
- Verify backend URL in frontend environment variables
- Check network tab in browser for API call details
- Ensure JWT tokens are being sent correctly

---

## 🔗 Useful URLs After Deployment

### **Production URLs**
- **Frontend**: `https://letrum-agency-frontend.onrender.com`
- **Backend API**: `https://letrum-agency-backend.onrender.com/api/v1`
- **API Documentation**: `https://letrum-agency-backend.onrender.com/api/docs`
- **Database**: Accessible via backend shell or Prisma Studio

### **Test Credentials**
- **Admin**: `admin@letrumagency.com` / `password123`
- **User**: `john.doe@example.com` / `password123`
- **Staff**: `staff@letrumagency.com` / `password123`

---

## 🎉 Deployment Complete!

Your Letrum Travel Agency application is now live on Render! 

### **Features Available:**
- ✅ User Authentication & Registration
- ✅ Tour Browsing & Booking
- ✅ Flight Search & Booking
- ✅ Car Rental System
- ✅ Visa Application Processing
- ✅ E-commerce Product Shop
- ✅ User Dashboard
- ✅ Admin Panel (for admin users)

### **Next Steps:**
1. **Custom Domain**: Add your own domain in Render settings
2. **SSL Certificate**: Automatically provided by Render
3. **Monitoring**: Set up uptime monitoring
4. **Backup**: Configure database backups
5. **CDN**: Consider adding a CDN for better performance

---

## 💡 Performance Optimization Tips

### **Backend Optimization**
- Enable response compression
- Implement API caching
- Optimize database queries
- Use connection pooling

### **Frontend Optimization**
- Enable Next.js image optimization
- Implement lazy loading
- Use CDN for static assets
- Minimize bundle size

### **Database Optimization**
- Add appropriate indexes
- Optimize complex queries
- Monitor query performance
- Regular maintenance

---

**🌍 Your Letrum Travel Agency is now ready to serve customers worldwide! ✈️**
