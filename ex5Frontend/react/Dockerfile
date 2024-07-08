FROM node:20

WORKDIR /app

# COPY package.json ./
# COPY public ./public
# COPY src ./src

COPY package.json ./
COPY public ./public
COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]