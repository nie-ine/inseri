# NieFrontend

![Travis build](https://api.travis-ci.org/nie-ine/nie-frontend.svg)
![Docker build](https://img.shields.io/docker/build/nieine/nie-frontend.svg)
![Docker automated build](https://img.shields.io/docker/automated/nie-frontend/nie-frontend.svg)
![Docker pulls](https://img.shields.io/docker/pulls/nieine/nie-frontend.svg)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Run in Docker container

1. Download and run Docker container: `docker run -p 5555:80 nieine/nie-frontend:latest`
2. Open `localhost:5555` in browser
3. Optional: Set `NGINX_HOST` and `NGINX_PORT` to customise the webserver. E.g. `docker run -e NGINX_HOST=http://example.com -e NGINX_PORT=1234 -p 1234:1234 nie/nie-frontend:latest`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
