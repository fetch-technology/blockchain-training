FROM node:alpine

ADD . /blockchain
RUN cd /blockchain && npm install

ENTRYPOINT cd /blockchain && node index.js
