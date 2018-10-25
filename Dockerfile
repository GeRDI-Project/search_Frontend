FROM nginx:1.15.5-alpine
WORKDIR /home/app
RUN apk add nodejs npm git
COPY build/docker/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/html/static
COPY . /home/app
RUN npm install
RUN npm run build
RUN cp dist/index.html /usr/share/nginx/html/index.html
RUN cp -r dist/static/* /usr/share/nginx/html/static
CMD nginx -g "daemon off;"
