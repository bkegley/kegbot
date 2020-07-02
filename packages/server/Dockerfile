FROM node:12-alpine3.12 as install
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./packages/server/package.json ./packages/server/package.json

RUN yarn

COPY ./packages/server ./packages/server
