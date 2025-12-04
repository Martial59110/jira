FROM node:20-bullseye-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false

FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
