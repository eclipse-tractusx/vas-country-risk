# Base image
FROM node:18-alpine AS compile-image

# Set work directory
WORKDIR /app

# Copy files
COPY package.json .
COPY --chown=node:node package-lock.json .
COPY public ./public
COPY --chown=node:node .env .
COPY src ./src

# Set permissions
RUN chown -R node:node /app && \
    chmod -R u+rwx,g+rx,o-rwx /app

# Use node user
USER node

# Set PATH
ENV PATH="./node_modules/.bin:$PATH"

# Install dependencies
RUN npm install --ignore-scripts @emotion/react @emotion/styled @mui/icons-material@5.10.6 @mui/material@5.10.7 react-simple-maps cx-portal-shared-components react-scripts

RUN npm install --ignore-scripts

# Build the project
RUN npm run build

# Base image for the final stage
FROM nginxinc/nginx-unprivileged:stable-alpine

# Copy Nginx configuration file
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from compile-image
COPY --from=compile-image /app/build /usr/share/nginx/html

# Change to root user
USER root

# Rename index.html for use in env variables inject script
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.reference

# Add env variables inject script and make it executable
COPY ./scripts/inject-dynamic-env.sh /docker-entrypoint.d/00-inject-dynamic-env.sh
RUN chmod +x /docker-entrypoint.d/00-inject-dynamic-env.sh

# Install bash and update vulnerable packages
RUN apk update && \
    apk add --no-cache bash

# Change ownership and switch back to nginx user
RUN chown -R 101:101 /usr/share/nginx/html/
USER 101
