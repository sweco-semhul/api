#/bin/bash

if [ "$ENV" = "prod" ]; then
  API_HOST_URL=$PROD_API_HOST_URL
elif [ "$ENV" = "test" ]; then
  API_HOST_URL=$TEST_API_HOST_URL
elif [ "$ENV" = "dev" ]; then
  API_HOST_URL=$DEV_API_HOST_URL
fi

sed -i 's/{HOST}/'"$API_HOST_URL"'/' pelias.json

npm start