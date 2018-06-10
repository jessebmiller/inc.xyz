FROM node as builder

RUN mkdir /build
WORKDIR /build
COPY package.json package-lock.json ./

RUN npm run build