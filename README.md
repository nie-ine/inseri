Our signature presentation for you: [https://inseri.swiss/](https://inseri.swiss/) 

------

#### Presented or mentioned at  

[National Swiss Scholarly Edition Infrastructure Conference 2020/11 | Switzerland | 22 YouTube Videos](https://www.youtube.com/playlist?list=PLkCga6LPxdgrZwu0xBxsZEJauJ8_pq8ru)

[Open Access in Action | Swissuniversities Project Highlights 2020 | Switzerland](https://claireclivaz.hypotheses.org/930)

[Virtual research environments and ancient manuscripts 2020/09 | University of Lausanne | Switzerland](https://claireclivaz.hypotheses.org/930)

[Swissuniversities Newsletter 2020/08 | Switzerland](https://www.swissuniversities.ch/themen/digitalisierung/p-5-wissenschaftliche-information/newsletter/newsletter-august-2020)

[Digitisation of newspapers collections 2020/04 | University of Luxembourg](https://impresso.github.io/eldorado/online-program/)

------

#### [User guide](https://github.com/nie-ine/inseri/tree/devel/Tutorials/Your%20scientific%20publication%20A-Z)

-----

## Start inseri with docker-compose

If you want to use it locally or on your server, but you don't want to contribute own code.

  - ``git clone https://github.com/nie-ine/inseri.git``
  - ``cd inseri``
  - ```cp ./backend/settings_default ./backend/.settings```
  - replace salt in ./backend/.settings/slat.js to own secret string
  - ```docker network create inseri-net```
  - start reverse-proxy ```docker-compose -f docker-compose.nginx.yml up -d```
  - start extras ```docker-compose -f docker-compose.extras.yml up -d```
  - start inseri ```docker-compose -f docker-compose.inseri.yml up -d```

## Get it up and running for development
If you want to contribute own code.

#### Clone inseri
 - ``git clone https://github.com/nie-ine/inseri.git``
 - ``cd inseri``
 - ```cp ./backend/src/settings_default ./backend/src/.settings```
 - replace salt in ./backend/.settings/salt.js to own secret string

#### MongoDB:

 - `docker run --network some-net -v /my/own/datadir:/data/db --name some-mongo -p 27017:27017 -d mongo:4.4`
 - In the folder .settings, change the file mongodbServer.js Your file should look similar to the following:

 ```
const mongodbServer = 'mongodb+srv://localhost:27017/node-angular';

module.exports = {
  mongodbServer: mongodbServer
};
```

#### Install and start Angular and Node.js

 - ``npm ci``
 - ``npm run start`` for frontend
 - ``npm run start:server`` for backend

## Generate documentation

npm run compodoc

compodoc -p src/tsconfig.app.json -s

