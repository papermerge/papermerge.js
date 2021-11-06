# PapermergeJS

PapermergeJS is frontend part i.e. web-based user interface of Papermerge
Document Management System. It is meant to be used in conjunction with
[Papermerge REST API backend server]
(https://github.com/papermerge/papermerge-core).

## Prerequisites

In general, all you need to run this application is a modern web browser like
Google Chrome or Mozilla Firefox, however if you plan to run application in
development mode, you will need some extras:

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

Technically speaking, PapermergeJS is written using [EmberJS](https://emberjs.com/) web framework.

## Installation

* `git clone git@github.com:papermerge/papermerge.js.git` this repository
* `cd papermerge.js`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).


### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

