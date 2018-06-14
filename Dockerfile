FROM node as builder

RUN mkdir /build
WORKDIR /build
COPY package.json package-lock.json ./

RUN npm install

COPY webpack.config.js .babelrc ./
RUN mkdir /build/src
COPY src/client ./src/client

# compile client app to /build/dist/
RUN npm run build

COPY tsconfig.json tsconfig.json
COPY src/server ./src/server

# compile server to /build/server-dist/
RUN npm run tsc

FROM node

RUN mkdir /app
WORKDIR /app
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/server-dist /app/server
COPY --from=builder /build/dist /app/server/client
COPY src/server/resources /app/server/resources

CMD ["node", "/app/server/app.js"]

