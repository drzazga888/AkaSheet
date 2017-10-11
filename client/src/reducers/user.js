import { combineReducers } from 'redux'

import * as userActions from '../actions/user'
import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case userActions.USER_POST_REQUEST:
            return true
        case userActions.USER_POST_SUCCESS:
        case userActions.USER_POST_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case userActions.USER_POST_REQUEST:
            return null
        case userActions.USER_POST_FAILURE:
            return action.error
        default:
            return state
    }
}

const name = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_SUCCESS:
            return action.payload.user.name
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

const surname = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_SUCCESS:
            return action.payload.user.surname
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

const email = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_SUCCESS:
            return action.payload.user.email
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, name, surname, email })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getEmail = (state) => state.email