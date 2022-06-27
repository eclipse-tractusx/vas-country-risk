# STAGE 1: Build
FROM node:alpine

WORKDIR /data

ENV PATH="./node_modules/.bin:$PATH"

copy . .

RUN npm run build

CMD ["npm","start"]