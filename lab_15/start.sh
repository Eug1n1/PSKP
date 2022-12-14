#!/bin/bash
mkdir /tmp/mongodata
sudo systemctl start mongodb
mongod --dbpath /tmp/mongodata/ --logpath /tmp/mongolog.log --port 27018 --replSet sr0 --fork

