FROM node:latest AS compile-image

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

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

FROM nginxinc/nginx-unprivileged:latest

RUN groupadd -r swuser -g 433 && \
    useradd -u 431 -r -g swuser -s /sbin/nologin -c "Docker image user" swuser

USER swuser

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080




EXPOSE 80




