#!/usr/bin/env bash

DATE=`date +%Y-%m-%d`

docker login

docker build -t nieine/inseri-backend:${DATE} -f Dockerfile.backend .
docker push nieine/inseri-backend:${DATE}

docker build --build-arg NG_CONFIG=production -t nieine/inseri-frontend:${DATE} -f Dockerfile.frontend .
docker push nieine/inseri-frontend:${DATE}
