FROM node:20

WORKDIR /app

RUN git config --global url."https://".insteadOf "ssh://git@"
RUN git config --global url."@github.com">https://${GITHUB_TOKEN}@github.com".insteadOf "https://github.com"

COPY package.json ./
COPY ./public ./public
COPY ./src ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]