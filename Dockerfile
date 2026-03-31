# Stage 1: Build
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Enable corepack for modern package managers
RUN corepack enable

# Copy package files
COPY package*.json ./

# Install dependencies (using npm install because package-lock.json seems to be out of sync)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt 4 application
# This generates the standalone server in .output/
RUN npm run build

# Stage 2: Production
FROM node:24-alpine AS runner

WORKDIR /app

# Nuxt 4 runs perfectly on Alpine, but it's good practice to run as a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxtjs -u 1001

# Copy the built output from the builder stage
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

# Set environment variables for Nuxt 3 / Nitro
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Switch to the non-root user
USER nuxtjs

# Expose the port the app runs on
EXPOSE 3000

# Start the Nuxt 4 Nitro server
CMD ["node", ".output/server/index.mjs"]
