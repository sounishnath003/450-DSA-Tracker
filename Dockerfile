FROM node:alpine

WORKDIR /

COPY package.json .

RUN yarn install

RUN yarn all:install
 
COPY -R / ./

EXPOSE 5000
EXPOSE 3000

CMD [ "yarn", "dev" ]



