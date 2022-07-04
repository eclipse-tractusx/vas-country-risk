# => Build container
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json .
COPY ./ .

EXPOSE 80
EXPOSE 443
EXPOSE 8080

RUN npm install react-scripts 

RUN npm start 
