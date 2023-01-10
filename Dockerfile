FROM node:16.15.1 AS compile-image


FROM nginxinc/nginx-unprivileged:latest

WORKDIR /usr/share/nginx/html


ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 8080

EXPOSE 80




