# Tasks API

![Node](https://img.shields.io/badge/node-20-green.svg)

Structure for app :open_file_folder: :octocat:

### Guide

- [Tasks API](#tasks-api)
    - [Guide](#guide)
  - [Installing Necessary Dependencies](#installing-necessary-dependencies)
  - [Running the App](#running-the-app)
    - [Running Makefile](#running-makefile)
    - [Runnning tests](#runnning-tests)
    - [Runnning with docker-compose(if you prefer)](#runnning-with-docker-composeif-you-prefer)
    - [The following addresses can be used to access running services:](#the-following-addresses-can-be-used-to-access-running-services)
  - [Decisions](#decisions)
    - [Architecture](#architecture)
    - [Database](#database)
    - [Error Tracking](#error-tracking)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Linting](#linting)

## Installing Necessary Dependencies

First of all, you need to install Docker and docker-compose in case you don't have them already installed. For this, you
can access this [link](https://docs.docker.com/install/) and install Docker
and [here](https://docs.docker.com/compose/install/) for docker-compose.

## Running the App

After ensuring you have Docker installed, now we can run the app. First, run the application and database with `make run-app`, and the services up. Docker may
need to build images for the first time, and this operation may take some time to complete. Example:

### Running Makefile

```bash
$ make run-app
src|master⚡ ⇒ make run-app
Starting the application...
Setting up database...
[+] Running 2/2
 ✔ Network src_default  Created                                                                                                                                                                                                    0.2s
 ✔ Container mongo      Started
...
...
...
Attaching to mongo, task-api
task-api  | yarn run v1.22.19
task-api  | $ node app.js
task-api  | Server is running on port 3000
```

### Runnning tests

```bash
$ make tests
Preparing to run the tests...
WARN[0000] /Users/medson.pinheiro/workspace/ss/todo-list/app/tasks-service/secondary/docker-compose.yml: `version` is obsolete 
[+] Creating 1/0
 ✔ Container mongo  Running                                                                                                                                     0.0s 
yarn run v1.22.22
$ NODE_ENV=test jest
  console.log
    Database connected

      at log (infrastructure/config/databaseConfig.js:6:13)

 PASS  tests/controllers/taskControllerTest.spec.js
  Task Controller Integration
    ✓ should create a new task (49 ms)
    ✓ should list tasks (16 ms)
...
...
 app/infrastructure/repositories |   88.88 |      100 |      80 |   88.88 |                   
  taskMongoRepository.js         |   88.88 |      100 |      80 |   88.88 | 19                
 app/infrastructure/swagger      |     100 |      100 |     100 |     100 |                   
  swaggerConfig.js               |     100 |      100 |     100 |     100 |                   
  swaggerDefinitions.js          |       0 |        0 |       0 |       0 |                   
---------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.353 s
```

### Runnning with docker-compose(if you prefer)

```bash
$ docker-compose up --build
ddocker-compose up
[+] Running 5/9
 ⠸ mongo [⣿⣿⣿⣿⣿⠀⠀⠀] Pulling                                                                                                                                                                                                       24.3s
   ✔ 9b10a938e284 Pull complete                                                                                                                                                                                                    6.6s
   ✔ 6f33a3006c47 Pull complete                                                                                                                                                                                                    4.5s
...
...
...
task-api  | yarn run v1.22.19
task-api  | $ node app.js
task-api  | Server is running on port 3000
```

### The following addresses can be used to access running services:

- [localhost:3000/api/v1/tasks](http://localhost:300/api/v1/tasks), for the API.
- [localhost:3000/api-docs/](http://localhost:3000/api-docs), for Swagger requests.

Response data types and request optional parameters, can be seen at [api/README.md](api/README.md) File.

## Decisions

### Architecture

For the API, I decided to use the hexagonal architecture pattern. Despite the service being initially simple, I am
thinking long-term. As new features are added, such as interactions with other microservices and layers, and potential
integrations with more complex business rules, the hexagonal architecture provides us with a robust and flexible
foundation.

The main advantage would be the ability to decouple the application layers. In practice, this translates into an
organized structure where the application domain takes center stage.

This approach not only enhances code maintenance, making it more modular and understandable, but also prepares the
application to scale and adapt to future changes in business and technological requirements.

### Database

I decided to use MongoDB for the Tasks API due to its flexibility and scalability, which are essential for a system that
can grow unpredictably and have functionalities similar to tools like Jira and Kanbanize. MongoDB offers flexible data
modeling that can adapt to changes in data structure without complex schemas. Its efficient horizontal scalability and
strong performance in read and write operations are ideal for supporting a dynamic and highly available environment like
task management.

### Error Tracking

I decided not to use a logger because the application is simple, and errors are handled well by the Express middleware,
which already returns error details in the response with status codes and messages. Additionally, I understand that it
is straightforward to add logging functionality, but I wanted to prioritize the time available to focus on other aspects
of the implementation.

### Testing

For the tests, I preferred to choose jest for practicality, combining with the supertest. The coverage is good, it can
be seen by running a `yarn test`, and access `index.html` file generated inside, `src/tests/lcov-report/` at the root of
the project, the current percentage of coverage is 89%.

### Documentation

For the documentation I used swagger, commonly used for documentation of APIs. The swagger and can be accessed
at [localhost:3000/api-docs](http://localhost:3000/api-docs/). About API calling, is possible see more about requests
and responses in [README_API.md](README_API.md).

### Linting

About linting, was used eslint and prettier.
