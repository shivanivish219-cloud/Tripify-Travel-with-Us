FROM node:18-alpine

WORKDIR /app

COPY Tripify-Backend/package*.json ./

RUN npm install

COPY Tripify-Backend/ ./

EXPOSE 5000

CMD ["npm", "start"]