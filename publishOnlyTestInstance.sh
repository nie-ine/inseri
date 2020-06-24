#!/usr/bin/env bash

DATE=`date +%y-%m-%d`

docker login

ng build --optimization=false --configuration=test
docker build -t nieos-test-instance .
docker tag nieos-test-instance:latest nieine/nieos-test-instance:${DATE}v3
docker push nieine/nieos-test-instance:${DATE}v3
