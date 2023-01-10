FROM nginx:1.22.1-alpine

RUN apk update
RUN apk add openssl
RUN apk del libssl1.1
RUN apk search libcurl
RUN apk add libcurl=7.83.1-r5
RUN apk search curl
RUN apk add curl=7.83.1-r5