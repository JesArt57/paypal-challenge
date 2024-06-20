# Dependencies
FROM node:20-slim as dependencies

WORKDIR /app

COPY package.json ./

RUN yarn install

# Builder
FROM dependencies as builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN yarn add @nestjs/cli --dev

RUN yarn build

# Final stage
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD ["node", "dist/main"]