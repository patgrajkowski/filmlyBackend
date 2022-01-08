FROM node:10-alpine
WORKDIR /backendApp
COPY package.json .
RUN npm install
COPY index.js .
COPY models .
COPY routes .
CMD ["node", "index.js"]