FROM nginx:1.22.1-alpine

ENV CURL_VERSION=7.87.0

RUN set -eux; \
      apk add --no-cache \
        curl="${CURL_VERSION}" \
        libcurl="${CURL_VERSION}" \
