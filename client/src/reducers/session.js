import { combineReducers } from 'redux'

import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_REQUEST:
        case sessionActions.SESSION_DELETE_REQUEST:
            return true
        case sessionActions.SESSION_POST_SUCCESS:
        case sessionActions.SESSION_POST_FAILURE:
        case sessionActions.SESSION_DELETE_SUCCESS:
        case sessionActions.SESSION_DELETE_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_DELETE_REQUEST:
        case sessionActions.SESSION_POST_REQUEST:
            return null
        case sessionActions.SESSION_DELETE_FAILURE:
        case sessionActions.SESSION_POST_FAILURE:
            return action.error
        default:
            return state
    }
}

const token = (state = null, action) => {
    switch (action.type) {
        case sessionActions.SESSION_POST_SUCCESS:
            return action.payload.token
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, token })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getToken = (state) => state.token