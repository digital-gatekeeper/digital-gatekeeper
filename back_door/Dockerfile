FROM node:18.17.0

RUN apt-get update && apt-get install -y python3

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm","start"]