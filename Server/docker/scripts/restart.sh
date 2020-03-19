#!/bin/bash

if [ "$EUID" -ne 0 ]
    then echo "### Root privileges required"
    exit
fi

cd ..

echo "### Restarting docker containers"
docker-compose restart
