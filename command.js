const {Command} = require('@dynejs/core')
const {container} = require('./dist/container')

const commander = container.resolve(Command)

commander.run()
    .then(() => process.exit(1))
    .catch((err) => console.log(err))
