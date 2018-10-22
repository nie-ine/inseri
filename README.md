Contact and info about the organisation NIE-INE | NATIONAL INFRASTRUCTURE FOR EDITIONS | A swiss-wide organisation for the infrastructure of editions: [https://www.nie-ine.ch/](https://www.nie-ine.ch/)

Powered by [FEE](http://www.fee.unibas.ch/), mandated by [swissuniversities](https://www.swissuniversities.ch/)

# nieOS

[![Build Status](https://travis-ci.org/nie-ine/nieOS.svg?branch=devel)](https://travis-ci.org/nie-ine/nieOS)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running for development

 - Create a sandbox on Mongodb
 - Create a folder .settings and store your password in ...
 - ``git clone https://github.com/nie-ine/nieOS.git``
 - ``cd nieOS``
 - ``yarn``
 - ``ng s``
 

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
 - in frontend, replace service (example for action in dashboard)
 - add mongoose Schema, instantiate it in backend/routes and assign req.body to mongoose object
 - save data to the database (ref tutorial 53)
 - check if it worked with mongo shell, again in 53
 - Fetch data from database, 54. Mongoose - docs tells more details on how to narrow fetching the data. Example again in backend/routes/action.js
 - Map _id from mongodb to id in frontent, like in dashboard.component.ts onInit()
