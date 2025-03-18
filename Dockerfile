FROM node:20-alpine

WORKDIR /src

COPY package*.json  /

RUN npm ci

COPY . /src

RUN npm run build

CMD npm start