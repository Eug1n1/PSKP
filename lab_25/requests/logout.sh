#!/bin/bash
curl -X POST http://localhost:3000/api/auth/logout \
    -d ./cookies \
    -c ./cookies \
    | jq .
