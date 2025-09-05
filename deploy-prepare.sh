#!/bin/bash

echo "🚀 Preparing Letrum Agency for Render Deployment..."

# Check if we're in the project root
if [ ! -f "package.json" ] && [ ! -d "backend" ] && [ ! -d "frontend" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo "🏗️  Testing backend build..."
cd ../backend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed"
    exit 1
fi

echo "🏗️  Testing frontend build..."
cd ../frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo "📝 Checking for git repository..."
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for Render deployment"
    echo "✅ Git repository initialized"
else
    echo "🔧 Adding changes to git..."
    git add .
    git commit -m "Prepared for Render deployment - $(date)"
    echo "✅ Changes committed to git"
fi

echo ""
echo "🎉 Project is ready for Render deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Follow the RENDER_DEPLOYMENT_GUIDE.md"
echo "3. Deploy database first, then backend, then frontend"
echo ""
echo "🔗 Useful files created:"
echo "   - RENDER_DEPLOYMENT_GUIDE.md (detailed deployment guide)"
echo "   - render.yaml (Render configuration)"
echo "   - backend/.env.production (template)"
echo "   - frontend/.env.production (template)"
echo ""
echo "✨ Happy deploying!"
