# STAGE 1: Build
FROM node:alpine

WORKDIR /data

ENV PATH="./node_modules/.bin:$PATH"

copy . .

run sudo apt-get update && sudo apt-get install -y react-scripts git && npm run build

CMD ["npm","start"]