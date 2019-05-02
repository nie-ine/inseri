FROM nginx:1.15.8-alpine

COPY dist /usr/share/nginx/html
