FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NODE_PATH=/app/node_modules:/app/apps/api/node_modules
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /app/apps/api/dist ./apps/api/dist
WORKDIR /app/apps/api
USER nestjs
EXPOSE 3000
CMD ["node", "dist/main"]
