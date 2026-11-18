FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM nginx:alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/CN=localhost"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 443
