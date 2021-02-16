FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]