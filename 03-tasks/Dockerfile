FROM node:20-alpine as BUILDER

ARG BASE_DIR

WORKDIR /build

COPY ${BASE_DIR}/package.json ${BASE_DIR}/package-lock.json ./

RUN npm ci

COPY ${BASE_DIR}/. .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=BUILDER /build/dist ./dist
COPY --from=BUILDER /build/node_modules ./node_modules
COPY --from=BUILDER /build/package.json ./package.json

CMD ["npm", "run", "start"]