# Frontend
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend
FROM node:18-alpine AS backend
WORKDIR /app/backend
COPY Tripify-Backend/package*.json ./
RUN npm install
COPY Tripify-Backend .
EXPOSE 5000
CMD ["npm", "start"]