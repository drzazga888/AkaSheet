import { schema } from 'normalizr'

export const user = new schema.Entity('users')

export const session = new schema.Object({
    user
})

export const recipient = new schema.Entity('recipients', {
    users: [user]
})

export const transaction = new schema.Entity('transactions', {
    buyer: user,
    recipient
})