FROM node:16.15.1 AS compile-image

WORKDIR /app


COPY . .

USER node

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install @emotion/react  @emotion/styled  @mui/icons-material@5.10.6  @mui/material@5.10.7 react-simple-maps cx-portal-shared-components react-scripts

RUN npm install

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]


EXPOSE 8080

EXPOSE 80




