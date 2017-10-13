import { combineReducers } from 'redux'

import * as recipientsActions from '../actions/recipients'
import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case recipientsActions.RECIPIENTS_GET_REQUEST:
            return true
        case recipientsActions.RECIPIENTS_GET_SUCCESS:
        case recipientsActions.RECIPIENTS_GET_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case recipientsActions.RECIPIENTS_GET_REQUEST:
            return null
        case recipientsActions.RECIPIENTS_GET_FAILURE:
            return action.error
        default:
            return state
    }
}

const entries = (state = null, action) => {
    switch (action.type) {
        case recipientsActions.RECIPIENTS_GET_SUCCESS:
            return action.payload.map(({ id, name, users }) => ({ id, name, users: users.map(u => u.id) }))
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, entries })