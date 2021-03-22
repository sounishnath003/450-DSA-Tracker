FROM node:alpine

WORKDIR /DSA-app

COPY package.json /DSA-app

RUN npm install

COPY . /DSA-app

CMD ["npm", "start"]