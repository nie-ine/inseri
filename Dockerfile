FROM node:9.2.0-alpine as builder

WORKDIR /home/node/nieos

COPY . .

RUN npm install --global yarn

RUN chown -R node:node .
USER node

RUN yarn
RUN yarn add --dev @angular/cli

ENV PATH="$PATH:node_modules/@angular/cli/bin"

RUN ng build --prod --aot


FROM nginx:1.13.7
COPY --from=builder /home/node/nieos/dist /var/www/dist
COPY ./.docker/nginx.conf /etc/nginx/conf.d/nieos.template
COPY ./.docker/nginx-envsubst.sh /usr/bin/nginx-envsubst
RUN chmod +x /usr/bin/nginx-envsubst
ENV NGINX_HOST localhost
ENV NGINX_PORT 80
ENTRYPOINT ["nginx-envsubst"]
