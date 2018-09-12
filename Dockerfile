FROM nginx:1.13.0
COPY build/docker/default.conf /etc/nginx/conf.d/default.conf
COPY dist/index.html /usr/share/nginx/html/index.html
COPY build/docker/robots.txt /etc/share/nginx/html/robots.txt
COPY dist/static /usr/share/nginx/html/static
