'use strict'

const uuid = require('uuid')
const bcrypt = require('bcryptjs')

exports.up = async function (knex) {
    await knex.schema.createTable('users', function (table) {
        table.uuid('id').primary()
        table.string('name')
        table.string('email').index()
        table.string('password')
        table.string('role').default('customer')
        table.string('remember_token')
        table.timestamps()
    })

    await knex.schema.createTable('password_resets', function (table) {
        table.uuid('id').primary()
        table.string('email')
        table.string('token').index()
        table.string('expire')
        table.timestamps()
    })

    const salt = await bcrypt.genSalt(10)
    const encryptedPass = await bcrypt.hash('password', salt)

    await knex.table('users').insert({
        id: uuid(),
        name: 'admin',
        email: 'admin@admin.com',
        password: encryptedPass,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('password_resets')
}
