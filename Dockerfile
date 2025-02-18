FROM node:20.14 as build
WORKDIR .
COPY . .
RUN npm install
RUN npm run deploy
EXPOSE 8000
