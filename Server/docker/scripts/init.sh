#!/bin/bash

if [ "$EUID" -ne 0 ]
    then echo "### Root privileges required"
    exit
fi

cd ..

DOCKER_DATA=./data
if [ -f "$DOCKER_DATA" ]; then
    rm -rf DOCKER_DATA
fi

echo "### Initializing docker containers"
docker-compose up -d 

echo "### Fix pgadmin privileges issue"
cd ./data
sudo chown -R 5050:5050 ./pgadmin
cd ..

echo "### Starting docker containers"
docker-compose restart 
