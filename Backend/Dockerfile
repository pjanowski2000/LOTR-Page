FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 5000
CMD ["npm", "start"]