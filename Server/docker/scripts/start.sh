#!/bin/bash

if [ "$EUID" -ne 0 ]
    then echo "### Root privileges required"
    exit
fi

cd ..

echo "### Starting docker containers"
docker-compose up -d 
