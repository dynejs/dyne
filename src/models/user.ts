import { DB, Query } from '@dynejs/core'

export interface IUser {
    name: string
}

@DB({
    name: 'user',
    table: 'users'
})
export class User extends Query<IUser> {

}

export const user = () => new User()
