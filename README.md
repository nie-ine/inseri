## inseri - have a look!
To get a first impression what inseri does, please go here: [https://nie-ine.github.io/inseri/](https://nie-ine.github.io/inseri/)

Mandated by [swissuniversities](https://www.swissuniversities.ch/)

## Presented or mentioned at

[Virtual research environments and ancient manuscripts 2020/09 | University of Lausanne | Switzerland](https://claireclivaz.hypotheses.org/930)

[Swissuniversities Newsletter 2020/08 | Switzerland](https://www.swissuniversities.ch/themen/digitalisierung/p-5-wissenschaftliche-information/newsletter/newsletter-august-2020)

[Digitisation of newspapers collections 2020/04 | University of Luxembourg](https://impresso.github.io/eldorado/online-program/)

## Point of entry
[Check our user guide](https://github.com/nie-ine/inseri/tree/devel/Tutorials/Your%20scientific%20publication%20A-Z)

# Get it up and running

[![Build Status](https://travis-ci.org/nie-ine/NIE-OS.svg?branch=devel)](https://travis-ci.org/nie-ine/inseri)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running to use it locally with docker

 - ``git clone https://github.com/nie-ine/inseri.git``
 - ``cd inseri``
 
1. ```mv ./backend/settings_default ./backend/.settings```
2. ```docker-compose up```
3. Wait until the mongodb - container has a first terminal output, then restart the nieine/mean container, the last terminal output of the node container should say  "connected to database"

So, in another terminal, type:

```docker ps``` to find out the < container id > of nieine/mean

```docker restart < container id >```

You can find the software on the following ports:

Inseri:  [http://localhost:4200](http://localhost:4200)

MongoDB - Admin - Interface: [http://localhost:8081](http://localhost:8081)

## Get it up and running for development

### Clone inseri
 - ``git clone https://github.com/nie-ine/inseri.git``
 - ``cd inseri``

## 1. Create MongoDB instance:

### Alternative 1: Create your own MongoDB instance:
 - Create a sandbox on Mongodb, choose a free instance.
 - In this sandbox, add your IP to the whitelist
 - Get the server-connect string, similiar to this: ```mongodb+srv://user:dfgsdbdtrgr@cluster567-7kilp.mongodb.net/node-angular``` via klick on Connect, klick on connect your application, klick one nodejs

### Alternative 2: Contact jan.stoffregen@uzh.ch

## 2. Connect inseri to MongoDB: 
 - Create a folder .settings
 - In the folder settings, create the file mongodbServer.js Your file should look similiar to the following:

 
```
const mongodbServer = 'mongodb+srv://user:dfgsdbdtrgr@cluster567-7kilp.mongodb.net/node-angular';

module.exports = {
  mongodbServer: mongodbServer
};
```

- another file in this folder should be mailDetails, where you can put the information for your email - server, it should look like the following:

```
const emailAdress = '<your Email Address>';
const pw = '<your password>';
const recipient = '<default recipient if there is no other one defined>';
const type = '<type of your mail server>';

module.exports = {
  emailAdress: emailAdress,
  pw: pw,
  recipient: recipient,
  type: type
};
```

- another file is nieOsServer.js:

```
const nieOSServer = 'http://localhost:4200';

module.exports = {
  nieOSServer: nieOSServer
};

```

- another file is salt.js


```
const salt = 'your_secret_that_should_be_very_long';


module.exports = {
  salt: salt
};

```


## 3. Start Angular and Node.js

 - ``yarn``
 - ``ng s``

## 4. Start node.js
```npm run start:server```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Technical Documentation:

https://nie-ine.github.io/inseri/

## Generate documentation

npm run compodoc

compodoc -p src/tsconfig.app.json -s

