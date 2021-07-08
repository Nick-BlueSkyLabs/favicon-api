# first stage: build
FROM node:14-alpine AS builder
WORKDIR /var/www/favicon
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# second stage: deploy
FROM node:14-alpine AS deploy
ENV NODE_ENV production
WORKDIR /var/www/favicon
COPY --from=builder /var/www/favicon/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 4444
CMD yarn start