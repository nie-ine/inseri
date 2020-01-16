Contact and info about the organisation NIE-INE | NATIONAL INFRASTRUCTURE FOR EDITIONS | A swiss-wide organisation for the infrastructure of editions: [https://www.nie-ine.ch/](https://www.nie-ine.ch/)

Mandated by [swissuniversities](https://www.swissuniversities.ch/)

# inseri

[![Build Status](https://travis-ci.org/nie-ine/NIE-OS.svg?branch=devel)](https://travis-ci.org/nie-ine/NIE-OS)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running to use it locally with docker

 - ``git clone https://github.com/nie-ine/NIE-OS.git``
 - ``cd NIE-OS``
 
1. ```mv ./backend/settings_default ./backend/.settings```
2. ```docker-compose up```
3. Wait until the mongodb - conatiner has a first terminal output, then restart the nieine/mean container, the last terminal output of the node container should say  "connected to database"

So, in another terminal, type:

```docker ps``` to find out the < container id > of nieine/mean

```docker restart < container id >```

You can find the software on the following ports:

NIE-OS:  [http://localhost:4200](http://localhost:4200)

MongoDB - Admin - Interface: [http://localhost:8081](http://localhost:8081)

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

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Technical Documentation:

https://nie-ine.github.io/inseri/

## How can I use NIE-OS to create websites and components of websites?

The following graph illustrates how you can use NIE-OS:

--> 1. You can create your entire website in NIE-OS with the help of pageSets. While this is suitable and you have the option to create your own,
project specific design, you don't have the option to design all parts of the design of your website. 

--> 2.1.1 "I design my own website and I use iframe to include apps that I host on my own webserver": You can host an NIE-OS instance on your 
webserver, create a page, open the desired app with the option to display it as a full - screen - app, publish this app and include it in
your own website with iframe

--> 2.1.2 "I design my own website and I use iframe to include pages that I host on my own webserver": You can host an NIE-OS instance on your 
webserver, create a page, open the desired apps, publish this app and include it in your own website with iframe

--> 2.1.3 "I design my own website and I use iframe to include apps that I host on the NIE-OS productive instance": You can create an account,
on our productive NIE-OS instance, create a page, open the desired app with the option to display it as a full - screen - app, publish this app and include it in
your own website with iframe

--> 2.1.4 "I design my own website and I use iframe to include pages that I host on the NIE-OS productive instance": You can create an account,
on our productive NIE-OS instance, create a page, open the desired app with the option to display it as a full - screen - app, publish this app and include it in
your own website with iframe

--> 2.2.1 "I'd like to use apps from NIE-OS in my own website": Each app will bee available as an own npm - module that you can use in your
Javascript - Based Website, for instance using Angular, pure Javascript, Vue.js, etc.

--> 2.2.2 "I'd like to use pages from NIE-OS in my own website": You can create a page in NIE-OS and export it. Then you can include NIE-OS
as an npm - module in your code with the page - export - file as an input. This feature is still under development:
[https://github.com/nie-ine/NIE-OS/issues/273](https://github.com/nie-ine/NIE-OS/issues/273)


<img src="./src/assets/img/NIE-OS_publication_process.png" alt="NIE-OS publication options" width="1000"/>

## Generate documentation

npm run compodoc

compodoc -p src/tsconfig.app.json -s

