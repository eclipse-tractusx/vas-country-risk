#********************************************************************************
# Copyright (c) 2022,2024 BMW Group AG
# Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
#*******************************************************************************

# Base image
FROM node:20-alpine AS compile-image

# Set work directory
WORKDIR /app

# Copy files
COPY package.json .
COPY --chown=node:node package-lock.json .
COPY public ./public
COPY --chown=node:node .env .
COPY src ./src

COPY LICENSE NOTICE.md DEPENDENCIES SECURITY.md /app/dist/

# Set permissions
RUN chown -R node:node /app && \
    chmod -R u+rwx,g+rx,o-rwx /app

# Use node user
USER node

# Set PATH
ENV PATH="./node_modules/.bin:$PATH"

# Install dependencies for build
RUN npm install --ignore-scripts

# Build the project
RUN npm run build

# Base image for the final stage
FROM nginxinc/nginx-unprivileged:alpine

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


# Change ownership and switch back to nginx user
RUN chown -R 101:101 /usr/share/nginx/html/
USER 101
