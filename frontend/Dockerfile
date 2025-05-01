# Use official Node image to build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Use a lightweight web server to serve the built files
FROM node:20-alpine AS runner

WORKDIR /app

# Install Vite for preview serving
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port used by Vite preview or serve
EXPOSE 4173

# Start the preview server
CMD ["serve", "-s", "dist", "-l", "4173"]

