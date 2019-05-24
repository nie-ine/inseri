Contact and info about the organisation NIE-INE | NATIONAL INFRASTRUCTURE FOR EDITIONS | A swiss-wide organisation for the infrastructure of editions: [https://www.nie-ine.ch/](https://www.nie-ine.ch/)

Powered by [FEE](http://www.fee.unibas.ch/), mandated by [swissuniversities](https://www.swissuniversities.ch/)

# nieOS

[![Build Status](https://travis-ci.org/nie-ine/NIE-OS.svg?branch=devel)](https://travis-ci.org/nie-ine/NIE-OS)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running to use it locally

 - ``git clone https://github.com/nie-ine/NIE-OS.git``
 - ``cd NIE-OS``
 
1. ```mv ./backend/settings_default ./backend/.settings```
2. ```docker-compose up```
3. Wait until the mongodb - conatiner has a first terminal output, then restart the nieine/mean container, the last terminal output of the node container should say  "connected to database"

So, in another terminal, type:

```docker ps``` to find out the < container id > of nieine/mean`

```docker restart < container id >``


## Get it up and running for development

### Clone nieOS
 - ``git clone https://github.com/nie-ine/NIE-OS.git``
 - ``cd NIE-OS``

## 1. Create MongoDB instance:

### Alternative 1: Create your own MongoDB instance:
 - Create a sandbox on Mongodb, choose a free instance.
 - In this sandbox, add your IP to the whitelist
 - Get the server-connect string, similiar to this: ```mongodb+srv://user:dfgsdbdtrgr@cluster567-7kilp.mongodb.net/node-angular``` via klick on Connect, klick on connect your application, klick one nodejs

### Alternative 2: Contact jan.stoffregen@uzh.ch

## 2. Connect nieOS to MongoDB: 
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

## Run in Docker container 
run ```docker-compose up```

If everything works as expected, push the mean - image to dockerhub (once tag it as with a version, once tag it with latest) and pull it on your server.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Technical Documentation:

https://nie-ine.github.io/NIE-OS/
