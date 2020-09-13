# Dyne

Dyne is a small framework for building server-side applications. Its built on top of Node Express, uses modern javascript and built with Typescript.

Features:
 - Modular design
 - Dependency injection and simple service container
 - Class based controllers
 - Supports async-await
 - Database query helpers (mysql - postgres)
 
## Installation
 
 - Checkout or download
 - run `npm install`
 - compiling typescript to js: `npm build`
 - setup the `config.js`
 - copy `config.sample.js` to `config.js` and set parameters

## Container
Dyne provides a very simple service container, where we can register our classes. These registered classes can be automatically injected into other services.
 
## Modules
Modules are the building blocks of your application. For smaller applications we can group all the things into our `AppModule`. A module is responsible for registering our controllers and services in the container and take an initial setup. 
A module should extend the `Module` class. To see an example, start with `AppModule` in `src` folder.

A module has two main functions:
- register
- boot

**Register**   
You should register your services and controllers in this method:

```js
register() {
    this.container.registerMany([
        SampleService,
        UserController
    ])
}
```

**Boot**   
In your boot function you have the ability to make additional setup. 
**This method is called** when all modules registration is done. In this part all registration are done, so "later" registered module's services are also available in the service container. This is useful to make additional setup based on other modules registration. 
 
## Controllers and routing
Here is a controller example, which we place in `src/controllers` 
 ```js
import { Get, Injectable, Request, Response } from '@dynejs/core'

@Injectable()
export class SomeController {

    @Get('/')
    index(req: Request, res: Response) {
        res.send({message: 'Hello'})
    }
}
```

You should decorate your controllers and services with the `@Injectable` decorator. This will register the class in the container.

The `@Get` decorator means, this controller function should handle the incoming request on the `/` path. You can also use: `@Post`, `@Put` and `@Delete`.

This decorators accepts two parameters. First is the route path, which is an express route path.
For example: `@Get('/users/:id')`. The second parameters is an array of middleware functions.

```js
@Get('/users/:id', [isUser('admin')])
showUsers() {
    //...
}
```
 
## Services
Services may contain more business logic which not fits in your controllers or manage third party stuff.

```js
import { Injectable } from '@dynejs/core'

@Injectable()
export class MyService {
    
    config: Config

    constructor(config: Config) {
        this.confing = config
    }

    myServiceStuff() {
        return this.config.get('some.value')
    }
}
```

These services cab be injected into your controllers:
```js
import { Injectable } from '@dynejs/core'
import { MyService } from '../services/myservice.service.ts'

@Injectable()
export class SomeController {

    private myService: MyService

    constructor(myService: MyService) {
        this.myService = myService
    }
}   
```

## Queries and DB
Query is a wrapper class above [knex.js](https://knexjs.org/). We can setup database queries for our application based on entities.

Let's see an example of a query:
```js
import { DB, Query, IQuery } from '@dynejs/core'

export interface IUser extends IQuery {
    name: string
    email: string
    role: string
}

@DB({
    name: 'user',
    table: 'users'
})
export class User extends Query<IUser> {}

export const user = () => new User()
```

> Exporting the `user` function is convenient way to create new queries.

We can define database columns or additional fields in our interface. We pass this interface to our `Query` class, so later we can reference those fields or make conditional queries on it.

The `@DB` decorator is sets the database table name and query "name". This is used for automatic relational queries.

Here is an example how we use it in our controllers:

```js
import { Get, Request, Response, Injectable } from '@dynejs/core'
import { user } from '../models/user'

@Injectable()
export class UserController {
    
    @Get('/users')
    async index(req: Request, res: Response) {
        const users = await user().get({
            role: 'guest'
        })
        res.send(users)
    }
}
```
