# Wekebere Dashboard Frontend
CWG-Market
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Built With

* [express, version 4.17.1](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Prerequisites

Nodejs latest

### Installing
```
npm install --save
```
#### Startup
```
NODE_ENV=dev CONFIG_DIR=./config/wekebere/ node app
```
## Deployment

Payment Hub uses Jenkins CI for its continuous build and continuous release pipeline.

Refer to [Jenkins for available builds](http://meuweke.koreasouth.cloudapp.azure.com:8080/job/CWG-Market/).

Jenkins file (TOBE) located in the github project root must be used for all CI & CD pipelines. 

## Versioning

We use [Semantic versioning](http://semver.org/). For the versions available, see the [tags on this repository](https://github.com/vascubrian/CWG-Market/releases).

## Authors

* **Brian Twijukye** - *Application architecture and development*

See also the list of [contributors](https://github.com/vascubrian/CWG-Market/graphs/contributors) who participated in this project.
