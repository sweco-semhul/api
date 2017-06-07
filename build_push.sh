#/bin/bash
APP=pelias-api
function usage {
    echo "Usage: "
    echo "   build_push.sh <version>"
    curl -s "http://tarzan:5000/v2/sweco/${APP}/tags/list" | jq .tags
}

if [ -z $1 ];
then
    usage
    exit 1
else
    IMAGE_VERSION=$1
fi
docker build -t tarzan.pgm.sweco.se/sweco/${APP}:${IMAGE_VERSION} .
docker build -t tarzan.pgm.sweco.se/sweco/${APP}:latest .
docker push tarzan.pgm.sweco.se/sweco/${APP}:${IMAGE_VERSION}
docker push tarzan.pgm.sweco.se/sweco/${APP}:latest
cd ..