FROM nginx:1.15.5-alpine
RUN apk add nodejs npm git
WORKDIR /home/app
COPY . /home/app
RUN npm install
RUN npm run build
RUN cp build/docker/default.conf /etc/nginx/conf.d/default.conf
CMD nginx -g "daemon off;"
