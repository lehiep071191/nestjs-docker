FROM node:16-alpine

WORKDIR /app/docker-test

COPY package*.json ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 9001

CMD [ "node", "./dist/main.js" ]
