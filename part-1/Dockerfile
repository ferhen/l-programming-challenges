FROM node:14.3.0 as debug

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node-dev

COPY . .

EXPOSE 8080
ENTRYPOINT [ "ts-node-dev", "--inspect=0.0.0.0:9229", "./src/index.ts"]

FROM node:14.3.0 as prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]