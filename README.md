# nieOS

[![Build Status](https://travis-ci.org/nie-ine/nieOS.svg?branch=devel)](https://travis-ci.org/nie-ine/nieOS)
![Docker build](https://img.shields.io/docker/build/nieine/nieos.svg)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nieos.svg)

## Get it up and running

 - ``git clone https://github.com/nie-ine/nieOS.git``
 - ``cd nieOS``
 - ``yarn``
 - ``ng s``
 

## Run in Docker container ( does not work at the moment )

1. Download and run Docker container: `docker run -p 5555:80 nieine/nieos:latest`
2. Open `localhost:5555` in browser
3. Optional: Set `NGINX_HOST` and `NGINX_PORT` to customise the webserver. E.g. `docker run -e NGINX_HOST=http://example.com -e NGINX_PORT=1234 -p 1234:1234 nieine/nieos:latest`.

## Development server

Run `ng s` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# nieOS Tour

### nieOS functionalities
 - nieOS is a database agnostic publication and work environment, focussed on historical critical editions
