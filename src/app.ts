import { container, createApp, Router } from '@dynejs/core'
import './container'

const app = createApp()

const router = container.resolve(Router)

router.run(app)

module.exports = app
