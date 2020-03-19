#!/bin/bash

if [ "$EUID" -ne 0 ]
    then echo "### Root privileges required"
    exit
fi

cd ..

echo "### Stopping docker containers"
docker kill $(docker ps -q -a)

echo "### Deleting docker containers"
docker rm $(docker ps -q -a)
