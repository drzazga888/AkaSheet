import { combineReducers } from 'redux'

import * as usersActions from '../actions/users'
import * as sessionActions from '../actions/session'
import * as recipientsActions from '../actions/recipients'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case usersActions.USER_POST_REQUEST:
            return true
        case usersActions.USER_POST_SUCCESS:
        case usersActions.USER_POST_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case usersActions.USER_POST_REQUEST:
            return null
        case usersActions.USER_POST_FAILURE:
            return action.error
        default:
            return state
    }
}

const entries = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_SUCCESS:
            return action.entities.users
        case recipientsActions.RECIPIENTS_GET_SUCCESS:
            return Object.assign({}, action.entities.users, state)
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, entries })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getUsers = (state) => state.entries
export const getUser = (id, state) => (state.entries || {})[id]
