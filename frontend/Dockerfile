FROM node:20-alpine
WORKDIR /app

# ➊ curl is required for the wait‑loop in entrypoint.sh
RUN apk add --no-cache curl

# ➋ install deps
COPY package*.json ./
RUN npm install -g openapi-typescript-codegen serve && npm ci

# ➌ copy the actual source AFTER deps
COPY . .

# ➍ copy the entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD \
  curl -sSf http://localhost:4173 || exit 1

ENTRYPOINT ["/entrypoint.sh"]
