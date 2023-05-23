FROM node:18 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./
COPY main.js .

RUN npm install

COPY . .

RUN npm run build

FROM node:18

COPY --from=BUILD_IMAGE /usr/src/app/dist .
COPY --from=BUILD_IMAGE /usr/src/app/package.json .
COPY --from=BUILD_IMAGE /usr/src/app/main.js .
RUN npm install

EXPOSE 80
EXPOSE 82

ENV NODE_ENV="production"
ENV APPLICATION_PORT=80
ENV DEBUG_PORT=82

CMD ["node", "main.js"]
