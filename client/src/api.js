const basePath = (typeof SERVER_PATH !== undefined ? SERVER_PATH : '') + '/api/'

const jsonOrThrow = (response) => response.ok ? response.json() : Promise.reject(response.status)

export const postUser = (payload) => fetch(basePath + 'user', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(payload)
}).then(jsonOrThrow)

export const getUser = (id, token) => fetch(basePath + 'user/' + id, {
    headers: {
        'X-Token': token
    },
    method: 'get'
}).then(jsonOrThrow)

export const postSession = (payload) => fetch(basePath + 'session', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(payload)
}).then(jsonOrThrow)

export const deleteSession = (token) => fetch(basePath + 'session', {
    headers: {
        'X-Token': token
    },
    method: 'delete'
})

export const getRecipients = (token) => fetch(basePath + 'recipient', {
    headers: {
        'X-Token': token
    },
    method: 'get'
}).then(jsonOrThrow)

export const getTransactions = (token) => fetch(basePath + 'transaction', {
    headers: {
        'X-Token': token
    },
    method: 'get'
}).then(jsonOrThrow)