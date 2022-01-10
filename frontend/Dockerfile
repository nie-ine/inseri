# stage builder
FROM node:16-slim as builder
WORKDIR /usr/src/app

# package*.json, tsconfig*.json, tslint.json
COPY *.json ./
RUN npm ci
COPY . ./

ARG NG_CONFIG=production
RUN npx ng build --configuration $NG_CONFIG
RUN gzip -kr9 dist/*

# stage run-time
FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
