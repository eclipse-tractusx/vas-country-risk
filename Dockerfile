# STAGE 1: Build
FROM node:alpine as builder

# Copy dependencies info
COPY /package.json ./
COPY /public ./public
COPY /src ./src

EXPOSE 8080
EXPOSE 3000
EXPOSE 80

RUN npm install -g npm@8.13.2


# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app

RUN npm install react-scripts


# set the startup command to run your binary
CMD ["npm", "start"]




