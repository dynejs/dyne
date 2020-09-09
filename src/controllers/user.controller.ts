import { Get, Injectable, Request, Response } from '@dynejs/core'
import { user } from '../models/user'
import { SampleService } from '../services/sample.service'

@Injectable()
export class UserController {

    private sampleService: SampleService

    constructor(sampleService: SampleService) {
        this.sampleService = sampleService
    }

    @Get('/')
    async index(req: Request, res: Response) {
        const users = await user().get()
        const theme = this.sampleService.getEnv()
        res.renderPage('users', {users, theme})
    }

}
