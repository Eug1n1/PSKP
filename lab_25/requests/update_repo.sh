#!/bin/bash
curl -X PUT http://localhost:3000/api/repos/$1/commits/$2 \
    -d "name=$3" \
    -b ./cookies \
    | jq .
