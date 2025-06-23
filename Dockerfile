# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Serve stage
FROM nginx:alpine
COPY --from=builder /app/build   /usr/share/nginx/html
# Optional: fallback to index.html for client‑side routing
COPY nginx.conf                 /etc/nginx/conf.d/default.conf