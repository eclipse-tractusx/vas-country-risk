FROM node:16.15.1 AS compile-image

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

USER root

RUN npm install react-scripts

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

USER root

RUN rm -rf ./*

COPY --from=compile-image /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80




