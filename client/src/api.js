const basePath = (typeof SERVER_PATH !== undefined ? SERVER_PATH : '') + '/api/'

const jsonOrThrow = (response) => response.ok ? response.json() : Promise.reject(response.status)

export const postUser = (payload) => fetch(basePath + 'user', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(payload)
}).then(jsonOrThrow)

export const postSession = (payload) => fetch(basePath + 'session', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(payload)
}).then(jsonOrThrow)
