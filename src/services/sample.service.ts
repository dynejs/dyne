import { Config, Injectable } from '@dynejs/core'

@Injectable()
export class SampleService {

    private config: Config

    constructor(config: Config) {
        this.config = config
    }

    getTheme() {
        return this.config.get('theme')
    }
}
