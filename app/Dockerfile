FROM node:20-alpine

WORKDIR /usr/src/app

# Install deps separately for better layer caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 3000

# Dev entrypoint (auto-reload)
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]
