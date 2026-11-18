FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --only=production
COPY . .
EXPOSE 8000
CMD ["node","app.js"]
