FROM node:12-alpine

WORKDIR /home/api

CMD npm run start:docker:dev

# pra subir o container
# "docker build -t nest-api ."
# pra rodar o container
# "docker run nest-api"
# instalar dependência dentro do container
# "docker-compose exec api npm install nodemon"
# todo comando agora para ser passado pra o container tem que ser
# "docker-compose exec api *"
# "docker-compose exec api nest -g"
