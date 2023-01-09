FROM node:16.15.1 AS compile-image

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN apt-get update && \
        apt-get install --yes --no-install-recommends wget build-essential libcurl4 && \
        wget https://curl.se/download/curl-7.74.0.tar.gz && \
        tar -xvf curl-7.74.0.tar.gz && cd curl-7.74.0 && \
        ./configure && make && make install

RUN npm install react-dom --legacy-peer-deps

RUN npm install jest enzyme enzyme-adapter-react-16 @babel/core @babel/preset-env --legacy-peer-deps

RUN npm install react-tooltip --legacy-peer-deps

RUN npm install keycloak-js --legacy-peer-deps

RUN npm install @mui/icons-material --legacy-peer-deps

RUN npm install @mui/material --legacy-peer-deps

RUN npm install --save html-to-image --legacy-peer-deps

RUN npm install cx-portal-shared-components --legacy-peer-deps

RUN npm install --legacy-peer-deps

RUN npm install react-scripts --legacy-peer-deps

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

USER swuser

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080




EXPOSE 80




