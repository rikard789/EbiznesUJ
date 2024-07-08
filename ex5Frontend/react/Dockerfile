FROM node:20-alpine

WORKDIR /app

# COPY package.json ./
# COPY public ./public
# COPY src ./src

COPY package.json ./
COPY public ./public
COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]