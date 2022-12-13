#!/bin/bash
mkdir /tmp/mongodata
sudo systemctl start mongodb
mongod --dbpath /tmp/mongodata/ --port 27018 --replSet sr0

