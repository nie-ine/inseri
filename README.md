Contact and info about the organisation NIE-INE | NATIONAL INFRASTRUCTURE FOR EDITIONS | A swiss-wide organisation for the infrastructure of editions: [https://www.nie-ine.ch/](https://www.nie-ine.ch/)

Powered by [FEE](http://www.fee.unibas.ch/), mandated by [swissuniversities](https://www.swissuniversities.ch/)

# nieOS

[![Build Status](https://travis-ci.org/nie-ine/nieOS.svg?branch=devel)](https://travis-ci.org/nie-ine/nieOS)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running for development

### Clone nieOS
 - ``git clone https://github.com/nie-ine/nieOS.git``
 - ``cd nieOS``

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

## 3. Start Angular and Node.js

  

 - ``yarn``
 - ``ng s``

## 4. Start node.js
```npm run start:server```
 

## Run in Docker container ( does not work at the moment )

1. Download and run Docker container: `docker run -p 5555:80 nieine/nieos:latest`
2. Open `localhost:5555` in browser
3. Optional: Set `NGINX_HOST` and `NGINX_PORT` to customise the webserver. E.g. `docker run -e NGINX_HOST=http://example.com -e NGINX_PORT=1234 -p 1234:1234 nieine/nieos:latest`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Development advice/ helping notes
### Extend nieOS models / move them from localstorage to mongodb
 - create an interface, like in shared/nieOS/mongodb/action/action.ts
 - in backend/models add action.js for mongoose
 - in backend/routes add <route>.js to post / update etc
 - add routes in app.js
 - create new service for mongodb in frontend, like mongodbAction.service.ts
 - test route in backend with console.log (without backend operations at first, bc it's easier.)
 - add mongoose Schema, instantiate it in backend/routes and assign req.body to mongoose object
 - save data to the database (ref tutorial 53)
 - check if it worked with mongo shell, again in 53
 - Fetch data from database, 54. Mongoose - docs tells more details on how to narrow fetching the data. Example again in backend/routes/action.js
 - Map _id from mongodb to id in frontent, like in dashboard.component.ts onInit()
 - integrate delete and update functions
