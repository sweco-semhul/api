# base image
FROM pelias/libpostal_baseimage

# maintainer information
LABEL maintainer="pelias@mapzen.com"

EXPOSE 3100

RUN apt-get update
RUN echo 'APT::Acquire::Retries "20";' >> /etc/apt/apt.conf
RUN apt-get install -y --no-install-recommends git curl libsnappy-dev autoconf automake libtool pkg-config

RUN mkdir -p /mnt/data/libpostal

RUN git clone https://github.com/openvenues/libpostal \
  && cd libpostal \
  && git checkout tags/v0.3.4 \
  && ./bootstrap.sh \
  && ./configure --datadir=/mnt/data/libpostal \
  && make \
  && make install \
  && ldconfig

#

# Where the app is built and run inside the docker fs
ENV WORK=/opt/pelias

# Used indirectly for saving npm logs etc.
ENV HOME=/opt/pelias

WORKDIR ${WORK}
COPY . ${WORK}

# Build and set permissions for arbitrary non-root user

RUN npm install -g node-gyp && npm install -g node-postal

RUN npm install && \
  chmod -R a+rwX .

# Don't run as root, because there's no reason to (https://docs.docker.com/engine/articles/dockerfile_best-practices/#user).
# This also reveals permission problems on local Docker.
RUN chown -R 9999:9999 ${WORK}
USER 9999

# start service
CMD [ "npm", "start" ]
