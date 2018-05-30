FROM nginx:alpine
EXPOSE 80
RUN apk update
RUN apk add nginx
COPY ui/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


