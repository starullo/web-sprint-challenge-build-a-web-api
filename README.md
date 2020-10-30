# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**. In your challenge this week, you will demonstrate your mastery of these skills by **designing and creating a web API to manage the following resources: `Projects` and `Actions`**.

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the sprint challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your TL if you need direction.

_You have **three hours** to complete this challenge. Plan your time accordingly._

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

### Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons) and your team lead as the evaluate your solution.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.
Node. js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node js is very fast (it uses google chromes v8 javascript engine) and makes it possible to run javascript code in different enviornments besides the browser. Express is a popular framework used for developing node.js applications. It allows you to easily set up servers, routes, and middleware.

1. Understand and explain the use of Middleware?

Middleware is code that can 'interrupt' our program and perform various actions (like authentication). Middleware improves the overall functionality of our code and can help keep it dry. I like to think of middleware as just a callback function. We can create custom middleware in node.js/express, in order to catch the request and make sure it has the proper information in the body/url. There's all kinds of middleware though, like that Morgan thing that logs out the request information.

1. The basic principles of the REST architectural style.
REST stands for Representational State Transfer. It is an architecture style for designing loosely coupled applications over HTTP, that is often used in the development of web services. It does not enforce any rule regarding how it should be implemented at lower level, it just put high level design guidelines and leave you to think of your own implementation.
REST defines 6 architetural restraints which make a true restful api-

UNIFORM INTERFACE

CLIENT-SERVER (the client application and server application must be able to evolve separately without any dependency on each other)

STATELESS (make all client-server interactions stateless)

CACHEABLE

LAYERED SYSTEM

CODE ON DEMAND (*optional* Most of the time you will be sending back data in the form of xml/json- but when you need to, you're able to send back executable code)

1. Understand and explain the use of Express Routers.
Express routers allow you to perform different actions based on different urls/endpoints. It's kinda similar to react router, you can say 'when someone makes a get request to this endpoint, this is what will happen'. 

1. Describe tooling used to manually test the correctness of an API.
There's a lot of tools out there to test your api, but I like to use postman and http pie. It allows you to communicate with your server and make different requests


*for stretch*
HEROKU URL https://websprintchallengeapi.herokuapp.com/

You are expected to be able to answer questions in these areas. Your responses contribute to your Sprint Challenge grade.

## Instructions

### Task 1: Project Set Up

- [ ] Create a forked copy of this project
- [ ] Add your team lead as collaborator on Github
- [ ] Clone your OWN version of the repository (Not Lambda's by mistake!)
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly
- [ ] Push commits: git push origin `<firstName-lastName>`

### Task 2: Project Requirements

Your finished project must include all of the following requirements:

#### NPM Scripts

- [ ] An _npm script_ named _"server"_ that uses `nodemon`to run the API server.
- [ ] Use _nodemon_ as a development time dependency only that is not deployed to production.
- [ ] An _npm script_ named _"start"_ that uses `node` to run the API server.

#### Build an API

- [ ] Design and build endpoints for performing CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Add an endpoint for retrieving the list of actions for a project.
- [ ] Use an HTTP client like `postman` or `insomnia` to test the API's endpoints.
- [ ] Use Express Routers to organize the API's code.

In your solution, it is essential that you follow best practices and produce clean and professional results. You will be scored on your adherence to proper code style and good organization. Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work. It is better to submit a challenge that meets MVP than one that attempts too much and does not.

### Task 3: Stretch Goals

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Deploy the API to Heroku.
- [ ] Configure the API to support environment variables.
- [ ] Use middleware for validation of incoming data.

## Submission format

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repo). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete after receiving your pull-request
