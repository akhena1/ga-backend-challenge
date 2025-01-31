FROM node:20

WORKDIR /usr/src/ga-backend-challenge

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]