import { BaseModule, container } from '@dynejs/core'
import { AppModule } from './app.module'

container.load([
    BaseModule,
    AppModule
])

export { container }
