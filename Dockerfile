# Base stage
FROM node:20-alpine AS base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Production stage
FROM base AS production

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]

# Test stage
FROM base AS test

CMD ["yarn", "test"]
