FROM nginx:alpine

# Nginx 설정 복사 및 포트 변경
RUN sed -i 's/listen       80;/listen 8080;/' /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

EXPOSE 8080
