FROM node:16.15.1 AS compile-image

WORKDIR /app


COPY . .

RUN chown -R root:node .
RUN chmod -R u+rwx,g+rwx,o+rwx .


USER node

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

FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]


EXPOSE 8080

EXPOSE 80




