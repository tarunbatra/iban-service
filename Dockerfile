FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG PORT=3000

EXPOSE $PORT

CMD [ "node", "index.js" ]