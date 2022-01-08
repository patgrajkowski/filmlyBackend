FROM node:16
WORKDIR /usr/src/backendApp
COPY ./app/package.json /usr/src/backendApp
COPY ./app/index.js /usr/src/backendApp
COPY ./app/models /usr/src/backendApp
COPY ./app/routes /usr/src/backendApp
RUN npm install
COPY ./app .
CMD ["node", "index.js"]