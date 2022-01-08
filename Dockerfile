FROM node:16
WORKDIR /usr/src/backendApp
COPY package.json /usr/src/backendApp
COPY index.js /usr/src/backendApp
COPY models /usr/src/backendApp
COPY routes /usr/src/backendApp
RUN npm install
COPY . .
CMD ["node", "index.js"]