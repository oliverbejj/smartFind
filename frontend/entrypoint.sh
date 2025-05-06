#!/bin/sh
set -euo pipefail

echo "⏳ Waiting for backend (http://backend:8000)…"
until curl -sf http://backend:8000/health > /dev/null; do
  sleep 2
done
echo "✅ Backend is healthy."

echo "🔧 Generating OpenAPI client…"
npx openapi-typescript-codegen \
  --input http://backend:8000/openapi.json \
  --output src/api-client

# patch the base URL
sed -i 's|BASE: .*|BASE: "http://localhost:8000",|' \
   src/api-client/core/OpenAPI.ts

echo "📦 Building Vite app…"
npm run build

echo "🚀 Serving on :4173"
exec npx serve -l 4173 -s dist
