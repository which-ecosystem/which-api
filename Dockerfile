FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URI=mongodb://db:27017/which

EXPOSE 3030

CMD ["npm", "start"]
