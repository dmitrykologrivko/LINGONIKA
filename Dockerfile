FROM node:20.14 as build

WORKDIR .
COPY . .

# Install all dependencies (including devDependencies)
ENV NODE_ENV=development
RUN npm install

ENV NODE_ENV=production
ENV VITE_NODE_ENV=production
RUN npm run deploy
RUN npm prune --omit=dev

EXPOSE 8000
