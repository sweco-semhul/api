#!/bin/bash

sed -i 's/{HOST}/'"$API_HOST_URL"'/' pelias.json

npm start