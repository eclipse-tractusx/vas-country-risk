FROM node:16.15.1 AS compile-image

WORKDIR /app


COPY . .

RUN chown -R root:node .
RUN chmod -R u+rwx,g+rwx,o+rwx .
RUN chmod -R 775 /app/package-lock.json

USER node

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=compile-image /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]


EXPOSE 8080

EXPOSE 80




