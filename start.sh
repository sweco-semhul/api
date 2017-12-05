#!/bin/bash

sed -i 's@{HOST}@'"$API_HOST_URL"'@g' pelias.json

sed -i 's@{VERSION}@'"$API_VERSION"'@g' pelias.json

npm start