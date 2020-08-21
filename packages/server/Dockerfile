FROM node:12-alpine3.12 as install
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/admin/package.json ./packages/sdcerver/package.json

RUN yarn

COPY ./packages/server ./packages/server

FROM node:12-alpine3.12
WORKDIR /app

COPY --from=install /app .

RUN yarn workspace @kegbot/server run build

CMD yarn workspace @kegbot/server run start
