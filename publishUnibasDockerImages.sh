#!/usr/bin/env bash

DATE=`date +%Y-%m-%d`

docker login

docker build -t nieine/inseri-backend-unibas:${DATE} -f Dockerfile.backend .
docker push nieine/inseri-backend-unibas:${DATE}

docker build --build-arg NG_CONFIG=unibas -t nieine/inseri-frontend-unibas:${DATE} -f Dockerfile.frontend .
docker push nieine/inseri-frontend-unibas:${DATE}
