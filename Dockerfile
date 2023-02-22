FROM node:16.15.1 AS compile-image

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY public ./public
copy .env* .
COPY src ./src

RUN chown -R root:node .
RUN chmod -R u+rwx,g+rwx,o+rwx .
RUN chmod -R 775 package-lock.json

USER node

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install @emotion/react  @emotion/styled  @mui/icons-material@5.10.6  @mui/material@5.10.7 react-simple-maps cx-portal-shared-components react-scripts

RUN npm install

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=compile-image /app/build /usr/share/nginx/html

# Change to root user for renaming of index.html to index.html.reference, to be used by env variables inject script
USER root

RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.reference


# Install bash for env variables inject script
RUN apk update && apk add bash

# Make nginx owner of /usr/share/nginx/html/ and change to nginx user
RUN chown -R 101:101 /usr/share/nginx/html/
USER 101






