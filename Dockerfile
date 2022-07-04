# => Build container
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json .
RUN npm
COPY ./ .
RUN npm build

FROM nginx:1.22.0-alpine


# Default port exposure
EXPOSE 80
EXPOSE 443
EXPOSE 8080
