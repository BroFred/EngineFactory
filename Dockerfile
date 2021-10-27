FROM node:17.0.1-alpine3.12
ARG ROOT=.
RUN mkdir -p build
COPY ${ROOT}/build ./build
RUN npm install -g http-server
CMD http-server ./build -p 8081 -g