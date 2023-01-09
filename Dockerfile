FROM node:latest AS compile-image

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install react-dom@latest --legacy-peer-deps

RUN npm install jest@latest enzyme@latest enzyme-adapter-react-16@latest @babel/core@latest @babel/preset-env@latest --legacy-peer-deps

RUN npm install react-tooltip@latest --legacy-peer-deps

RUN npm install keycloak-js@latest --legacy-peer-deps

RUN npm install @mui/icons-material@latest --legacy-peer-deps

RUN npm install @mui/material@latest --legacy-peer-deps

RUN npm install --save html-to-image@latest --legacy-peer-deps

RUN npm install cx-portal-shared-components@latest --legacy-peer-deps

RUN npm install --legacy-peer-deps

RUN npm install react-scripts@latest --legacy-peer-deps

RUN npm install curl@latest --legacy-peer-deps

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

USER myuser

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080



EXPOSE 80
