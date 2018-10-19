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


## Development advice
### Extend nieOS models
 - create an interface, like in shared/action.ts
 - in backend/models add action.js for mongoose
 - in backend/routes add <route>.js to post / update etc
 - add routes in app.js
 - adjust service so that it links to the right url
 - add mongoose Schema, instantiate it in backend/routes and assign req.body to mongoose object
 - save data to the database (ref tutorial 53)
 - check if it worked with mongo shell, again in 53
 - Fetch data from database, 54
