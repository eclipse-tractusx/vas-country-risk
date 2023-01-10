FROM node:latest AS compile-image

# Create a new user called 'myuser'
RUN useradd -m myuser

COPY . ./ /home/myuser/

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

FROM nginxinc/nginx-unprivileged:latest

# Create a new user called 'myuser'
RUN useradd -m myuser

RUN chown -R root:myuser /usr/share/nginx/html

RUN chmod -R 775 /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

USER myuser

COPY --from=compile-image /home/myuser/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080

EXPOSE 80
