#!/usr/bin/env bash

DATE=`date +%y-%m-%d`

VERSION="v2"

ng build --optimization=false --configuration=unibas
docker build -t nieos-test-instance-unibas .
docker tag nieos-test-instance-unibas:latest nieine/nieos-test-instance-unibas:${DATE}${VERSION}
docker push nieine/nieos-test-instance-unibas:${DATE}${VERSION}
