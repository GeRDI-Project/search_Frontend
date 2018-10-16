FROM nginx:1.15.5-alpine
RUN apk add nodejs npm git
WORKDIR /home/app
COPY . /home/app
RUN npm install
RUN npm run build
RUN cp build/docker/default.conf /etc/nginx/conf.d/default.conf
RUN cp dist/index.html /usr/share/nginx/html/index.html
RUN cp dist/store/static /usr/share/nginx/html/store/static
CMD nginx -g "daemon off;"
