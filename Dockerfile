FROM nginx:1.22.1-alpine

RUN apk update

RUN apk add openssl

RUN apk del libssl1.1

RUN openssl version