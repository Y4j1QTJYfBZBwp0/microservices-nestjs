FROM node:latest

WORKDIR /usr/src/api

COPY . .

COPY ./.env.prod ./.env

RUN npm install --quiet --no-optional --no-fund --loglelve=error

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
