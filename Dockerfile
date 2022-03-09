FROM node:alpine

WORKDIR /usr/app

EXPOSE 3000

CMD yarn api:start:prod