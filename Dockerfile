# Stage 1: Build the React application
FROM node:18 AS frontend-builder

WORKDIR /usr/src/app/frontend

COPY ./front-end/package*.json ./
RUN npm install
COPY ./front-end ./
RUN npm run build

# Stage 2: Setup the backend and copy the frontend build output
FROM node:18

WORKDIR /usr/src/app/backend

COPY ./back-end/package*.json ./
RUN npm install

COPY ./back-end .
COPY --from=frontend-builder /usr/src/app/frontend/build ./public

RUN npm run build

EXPOSE 3000 6001 6002

CMD ["node", "./dist/src/main.js"]
