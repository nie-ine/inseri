# stage builder
FROM node:16-alpine AS builder

ENV NODE_ENV=production
WORKDIR /usr/src/app

# package, package-lock, tsconfig
COPY *.json ./
RUN npm ci --include=dev

COPY src/. src/.
RUN npm run build

# stage run-time
FROM node:16-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY --chown=node:node --from=builder /usr/src/app/dist .
USER node

EXPOSE $PORT
CMD [ "node", "server.js" ]
