import { Config, Injectable } from '@dynejs/core'

@Injectable()
export class SampleService {

    private config: Config

    constructor(config: Config) {
        this.config = config
    }

    getEnv() {
        return this.config.get('env')
    }
}
