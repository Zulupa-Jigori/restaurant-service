FROM --platform=linux/amd64 node:18.16.1-alpine

EXPOSE 8080

RUN apk update && apk add --no-cache git

WORKDIR /opt/app/

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

CMD npm run start:prod