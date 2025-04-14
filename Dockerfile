# Nginx를 이용한 정적 웹사이트 호스팅용 Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
