# Use Node.js LTS (20.x) as base image
FROM node:20-slim

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and config files
COPY . .

# Build TypeScript code
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]