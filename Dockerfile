FROM nginx:alpine
EXPOSE 80
RUN apk update
RUN apk add nginx
RUN rm -rf /etc/nginx/conf.d
COPY nginx/default.conf /etc/nginx/conf.d/
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]