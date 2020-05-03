#!/usr/bin/env bash

DATE=`date +%y-%m-%d`

docker login

#ng build --optimization=false
#docker build -t nieos .
#docker tag nieos:latest nieine/nieos:${DATE}
#docker push nieine/nieos:${DATE}
#
#ng build --optimization=false --configuration=production
#docker build -t nieos-production-instance .
#docker tag nieos-production-instance:latest nieine/nieos-production-instance:${DATE}
#docker push nieine/nieos-production-instance:${DATE}

ng build --optimization=false --configuration=test
docker build -t nieos-test-instance .
docker tag nieos-test-instance:latest nieine/nieos-test-instance:${DATE}v2
docker push nieine/nieos-test-instance:${DATE}
