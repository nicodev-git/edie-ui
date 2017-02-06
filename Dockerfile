FROM node:7.0

COPY . /opt/
WORKDIR /opt/

CMD [ "npm", "run", "dev" ]