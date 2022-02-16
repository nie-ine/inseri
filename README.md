[![CircleCI](https://circleci.com/gh/nie-ine/inseri/tree/devel.svg?style=svg)](https://circleci.com/gh/nie-ine/inseri/tree/devel)

Our signature presentation for you: [https://nie-ine.github.io/inseri/](https://nie-ine.github.io/inseri/) 

------

#### Presented or mentioned at  

[National Swiss Scholarly Edition Infrastructure Conference 2020/11 | Switzerland | 22 YouTube Videos](https://www.youtube.com/playlist?list=PLkCga6LPxdgrZwu0xBxsZEJauJ8_pq8ru)

[Open Access in Action | Swissuniversities Project Highlights 2020 | Switzerland](https://claireclivaz.hypotheses.org/930)

[Virtual research environments and ancient manuscripts 2020/09 | University of Lausanne | Switzerland](https://claireclivaz.hypotheses.org/930)

[Swissuniversities Newsletter 2020/08 | Switzerland](https://www.swissuniversities.ch/themen/digitalisierung/p-5-wissenschaftliche-information/newsletter/newsletter-august-2020)

[Digitisation of newspapers collections 2020/04 | University of Luxembourg](https://impresso.github.io/eldorado/online-program/)

------

#### [User guide](https://github.com/nie-ine/inseri/tree/devel/Tutorials/Your%20scientific%20publication%20A-Z)

-----

## Start inseri using docker-compose
  - ``git clone https://github.com/nie-ine/inseri.git``
  - create an `.env.prod` file (similiar to `./backend/.env.dev`) as follows:
```
MAIL_EMAIL_ADDRESS=""
MAIL_PW=""
MAIL_RECIPIENT=""
MAIL_TYPE=""

MONGO_DB="mongodb://localhost:27017/node-angular"
NIE_OS_SERVER="http://localhost:4200"
SALT="my_secret_secret"
```
  - point the `env_file` in docker-compose.inseri.yml to the `.env.prod` file 
  - ```docker network create inseri-net```
  - start reverse-proxy ```docker-compose -f docker-compose.nginx.yml up -d```
  - start extras ```docker-compose -f docker-compose.extras.yml up -d```
  - start inseri ```docker-compose -f docker-compose.inseri.yml up -d```

## Prepare for development
  - ``git clone https://github.com/nie-ine/inseri.git``
  - ``cd inseri``
  - run MongoDb locally:
    - `docker run -v /my/own/datadir:/data/db --name some-mongo -p 27017:27017 -d mongo:4.4`
  - replace the values in `./backend/.env.dev` accordingly
  - install the dependencies first by executing `npm ci` in backend and frontend paths separately
  - now backend and fronted can be started using `npm start` (again in both paths separately)
  - to run tests in backend, use `npm run test`
  - to run tests with coverage, use `npm run test:coverage`
    - open `backend/coverage/index.html` for detailed testing coverage report

## Docker
To build and publish both docker images at the same

```./buildAndPublishDockerImages.sh```

To build individually, change the directory to either backend or frontend and then

```docker build -t my-image .```

## Backup
a detailed guide for backup can be found in [wiki](https://github.com/nie-ine/inseri/wiki/Mongodb-backup-instruction)

## Generate documentation

npm run compodoc

compodoc -p src/tsconfig.app.json -s
