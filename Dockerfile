FROM node:16.15.1 AS compile-image

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN mkdir -p build
COPY /build build/








