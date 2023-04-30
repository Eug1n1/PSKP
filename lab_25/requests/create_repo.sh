#!/bin/bash
curl -X POST http://localhost:3000/api/repos/$1/commits/$2 \
    -d "name=$3" \
    -b ./cookies \
    | jq .
