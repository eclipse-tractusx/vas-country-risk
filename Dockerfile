FROM node:16.15.1 AS compile-image

RUN apt-get update && apt-get install -y
RUN apt-get upgrade -y

# Create a new user called 'myuser'
RUN useradd -m myuser

COPY . . /home/myuser/

RUN chown -R root:myuser /usr/local/lib/node_modules/

RUN chmod -R 775 /usr/local/lib/node_modules/

RUN chown -R root:myuser /home/myuser

RUN chmod -R 775 /home/myuser

USER myuser

WORKDIR /home/myuser

RUN npm install react-dom --legacy-peer-deps --prefix /home/myuser

RUN npm install jest enzyme enzyme-adapter-react-16 @babel/core @babel/preset-env --legacy-peer-deps --prefix /home/myuser

RUN npm install react-tooltip --legacy-peer-deps --prefix /home/myuser

RUN npm install keycloak-js --legacy-peer-deps --prefix /home/myuser

RUN npm install @mui/icons-material --legacy-peer-deps --prefix /home/myuser

RUN npm install @mui/material --legacy-peer-deps --prefix /home/myuser

RUN npm install --save html-to-image --legacy-peer-deps --prefix /home/myuser

RUN npm install cx-portal-shared-components --legacy-peer-deps --prefix /home/myuser

RUN npm install --legacy-peer-deps --prefix /home/myuser

RUN npm install react-scripts --legacy-peer-deps --prefix /home/myuser

RUN npm run build --prefix /home/myuser

FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /usr/share/nginx/html

# Create a new user called 'myuser'
RUN useradd -m myusernginx

COPY --from=compile-image /home/myuser/build .

RUN chown -R root:myusernginx .

RUN chmod -R 775 .

USER myusernginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080

EXPOSE 80
