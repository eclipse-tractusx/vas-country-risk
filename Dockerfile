# STAGE 1: Build
FROM node:alpine

WORKDIR /data

ENV PATH="./node_modules/.bin:$PATH"

copy . .

RUN apt-get update && sudo apt-get install -y react-scripts && npm run build

CMD ["npm","start"]