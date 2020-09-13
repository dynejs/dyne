'use strict'

module.exports = {
    root: __dirname,

    url: 'http://localhost:3000',

    env: 'development',

    currency: 'USD',

    locale: 'en',

    dateFormat: '{YYYY}-{MM}-{DD} - {HH}:{mm}',

    database: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'dyne',
        client: 'mysql'
    },

    mail: {
        host: 'smtp.mailtrap.io',
        port: '2525',
        user: '',
        password: '',
        secure: false
    },

    session: {
        secret: ''
    },

    migrations: [
        __dirname + '/migrations'
    ],

    views: [
        __dirname + '/themes/front/views',
        __dirname + '/views'
    ],

    locales: [
        __dirname + '/locales'
    ]
}
