#!/usr/bin/env bash

docker-compose kill

docker rm -f $(docker ps -a -q)

docker rmi -f $(docker images -q)

docker-compose up &
