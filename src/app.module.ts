import { Module } from '@dynejs/core'
import { SampleService } from './services/sample.service'
import { UserController } from './controllers/user.controller'

export class AppModule extends Module {

    register() {
        this.container.registerMany([
            SampleService,
            UserController
        ])
    }
}
