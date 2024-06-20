FROM node:lts-alpine3.17 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:stable-alpine AS prod-stage

COPY --from=build /app/dist/ /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5174

CMD ["nginx","-g","daemon off;"]
