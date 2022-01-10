FROM node:16-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY --chown=node:node src/. .
USER node

EXPOSE $PORT
CMD [ "node", "server.js" ]
