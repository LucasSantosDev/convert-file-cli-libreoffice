FROM node:20-alpine

RUN apk update
# RUN apk add --no-cache libreoffice
RUN apk add libreoffice
RUN apk add ttf-freefont
RUN apk add openjdk11-jre

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk add msttcorefonts-installer
RUN update-ms-fonts
RUN fc-cache -f

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
