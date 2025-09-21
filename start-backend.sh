#!/usr/bin/env bash
# Start the NestJS backend in development mode from the repo root.
# This script is safe to run on Linux/macOS. It changes directory to backend
# and runs the npm script that starts the server with watch mode.

set -euo pipefail

cd "$(dirname "$0")/backend"

echo "Starting backend (npm run start:dev) in $(pwd)"

npm install --no-audit --no-fund

npm run start:dev
