# [백문이 불여일견] 환경 설정 및 실행 가이드

## 요구사항

### 소프트웨어
- Node.js: v18.17.1
- nginx version: nginx/1.18.0 (Ubuntu)
-mariadb version: 10.3.38-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04
- IDE: vscode 1.80

## 환경 설정

### Node.js 설치
https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi

### Nginx 설정
```
server {
    listen 80;
    server_name i9c106.p.SSSSS.io;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name i9c106.p.SSSSS.io;

    # SSL 인증서 파일 위치
    ssl_certificate /etc/letsencrypt/live/i9c106.p.SSSSS.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/i9c106.p.SSSSS.io/privkey.pem;

    # SSL 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location /api/ {
        proxy_pass http://localhost:3000;
    }
```



### IDE 설치
vscode 설치 :https://code.visualstudio.com/download

### 프로젝트 클론
```bash
git clone https://lab.SSSSS.com/s09-webmobile3-sub2/S09P12C106.git
cd S09P12C106

##db 접속 정보
DB 접속 정보
Host: i9c106.p.SSSSS.io
Port: 3306
Username: test
Password: test

###dockerfile 세부내용 
```
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

```
### dockerfile 실행

sudo docker build -t hotdog .

### 실행 방법
sudo docker run -p 3000:3000 -p 6001:6001 -p 6002:6002 hotdog
