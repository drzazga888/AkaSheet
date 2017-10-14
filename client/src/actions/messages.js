import * as constants from '../constants'

const messageTimeout = 5000

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

let msgTimeouts = {}

const addMessage = (message, severity) => (dispatch) => {
    msgTimeouts[message] && clearTimeout(msgTimeouts[message])
    dispatch({ type: ADD_MESSAGE, message, severity, date: (new Date()).toJSON() })
    msgTimeouts[message] = setTimeout(() => {
        dispatch({ type: REMOVE_MESSAGE, message })
    }, messageTimeout)
}

const addErrorMessage = (message) => addMessage(message, 'error')

export const addSuccessMessage = (message) => addMessage(message, 'success')

export const addErrorFromResponseCode = (code) => {
    switch (code) {
        case 400:
            return addErrorMessage(constants.MESSAGE_RESPONSE_BAD_REQEST)
        case 401:
            return addErrorMessage(constants.MESSAGE_RESPONSE_UNAUTHORIZED)
        case 403:
            return addErrorMessage(constants.MESSAGE_RESPONSE_FORBIDDEN)
        case 404:
            return addErrorMessage(constants.MESSAGE_RESPONSE_NOT_FOUND)
        case 409:
            return addErrorMessage(constants.MESSAGE_RESPONSE_CONFLICT)
        default:
            return addErrorMessage(constants.MESSAGE_RESPONSE_ERROR(code))
    }
}