FROM node:16.15.1 AS compile-image

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install react-dom --legacy-peer-deps

RUN npm install jest enzyme enzyme-adapter-react-16 @babel/core @babel/preset-env --legacy-peer-deps

RUN npm install react-tooltip --legacy-peer-deps

RUN npm install keycloak-js --legacy-peer-deps

RUN npm install @mui/icons-material --legacy-peer-deps

RUN npm install @mui/material --legacy-peer-deps

RUN npm install --save html-to-image --legacy-peer-deps

RUN npm install cx-portal-shared-components --legacy-peer-deps

RUN npm install --legacy-peer-deps

RUN npm install react-scripts --legacy-peer-deps

RUN npm run build

FROM nginx:1.22.1-alpine

RUN apk update && apk add openssl
RUN apk del libssl1.1
RUN apk search libcurl
RUN apk add libcurl=7.83.1-r5
RUN apk search curl
RUN apk add curl=7.83.1-r5

WORKDIR /usr/share/nginx/html

# Create a new user called 'myuser'
RUN adduser -D -g 'myuser' myuser

RUN chown -R root:myuser .

RUN chmod -R 775 .

RUN chown -R root:myuser /home/myuser

RUN chmod -R 775 /home/myuser

RUN chown -R root:myuser /usr/share/nginx/html

RUN chmod -R 775 /usr/share/nginx/html

USER myuser

COPY --from=compile-image /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080

EXPOSE 80
