#!/bin/bash

# Start the Letrum Agency API server
echo "🚀 Starting Letrum Agency API Server..."
echo "📁 Working directory: $(pwd)"
echo "🐘 Database: PostgreSQL"
echo "🔧 Environment: Development"

# Set the port
export PORT=5001

# Start the server
npm run start:dev
