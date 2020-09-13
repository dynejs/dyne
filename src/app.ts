import { app, BaseModule } from '@dynejs/core'
import { AppModule } from './app.module'

app([
    BaseModule,
    AppModule
])
