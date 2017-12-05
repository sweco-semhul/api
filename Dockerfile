# base image
FROM pelias/libpostal_baseimage

# maintainer information
LABEL maintainer="pelias@mapzen.com"

EXPOSE 3100

# Make sure host is set to enable exposure of app outside of docker container
ENV HOST 0.0.0.0

# Where the app is built and run inside the docker fs
ENV WORK=/opt/pelias

# Used indirectly for saving npm logs etc.
ENV HOME=/opt/pelias

WORKDIR ${WORK}
COPY . ${WORK}

# Build and set permissions for arbitrary non-root user
RUN npm install && \
  npm test && \
  chmod -R a+rwX .

# Don't run as root, because there's no reason to (https://docs.docker.com/engine/articles/dockerfile_best-practices/#user).
# This also reveals permission problems on local Docker.
RUN chown -R 9999:9999 ${WORK}
USER 9999

COPY ./pelias_docker.json ${WORK}/pelias.json

ENV API_HOST_URL localhost
ENV ENV dev
ENV API_VERSION snapshot
ENV PELIAS_CONFIG ${WORK}/pelias.json


# start service
CMD [ "./start.sh" ]