#!/bin/bash
echo "🔄 Installing dependencies..."
npm install

echo "🏗️ Building application..."
npm run build

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "✅ Backend build completed!"
