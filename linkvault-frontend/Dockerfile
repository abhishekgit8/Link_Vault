# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

# If using Next.js, install 'serve' to serve the build (or use next start for SSR)
RUN npm install -g serve

EXPOSE 3000

# For static export (if you use `next export`)
# CMD ["serve", "-s", "out", "-l", "3000"]

# For SSR/normal Next.js app:
CMD ["npm", "run", "start"]