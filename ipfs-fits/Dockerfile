# base image
FROM arm32v7/node:8

WORKDIR /ipfs-fits
ADD . /ipfs-fits
RUN npm install
RUN npm install web3@1.0.0-beta.37

CMD npm start