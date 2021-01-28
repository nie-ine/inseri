#!/usr/bin/env bash

DATE=`date +%y-%m-%d`

VERSION="v3"

docker login

ng build --optimization=false --configuration=test
docker build -t nieos-test-instance .
docker tag nieos-test-instance:latest nieine/nieos-test-instance:${DATE}${VERSION}
docker push nieine/nieos-test-instance:${DATE}${VERSION}
