# LaBottega

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.

This app link a set of clients with differents services performed during an appointment.
It can track the prices, the date and some informations about the client.
There is some stat's overview based on different criterials.

This app is intended to run only on localhost. So there is no security consideration nor authentication mechanism.
A shortcut in the app is present for downloading a dump of the database for manual backup (since it's only localhost).

## Server
The PHP files used as a light API is under the api folder.
No authentication to the server is defined since the app is
only running in localhost.
Be sure to only allow access to the server from localhost.

## Database
Database is MySQL.

Connection informations is under api/config/database.php.

## Client
The connection link to the server is under src/app/global.ts.

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

