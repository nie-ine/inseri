#!/bin/bash

envsubst '$$NGINX_HOST $$NGINX_PORT' < /etc/nginx/conf.d/nie-frontend.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
