import { combineReducers } from 'redux'

import * as usersActions from '../actions/users'
import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case usersActions.USER_POST_REQUEST:
        case usersActions.USERS_GET_REQUEST:
            return true
        case usersActions.USER_POST_SUCCESS:
        case usersActions.USER_POST_FAILURE:
        case usersActions.USERS_GET_SUCCESS:
        case usersActions.USERS_GET_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case usersActions.USER_POST_REQUEST:
        case usersActions.USERS_GET_REQUEST:
            return null
        case usersActions.USER_POST_FAILURE:
        case usersActions.USERS_GET_FAILURE:
            return action.error
        default:
            return state
    }
}

const entries = (state = null, action) => {
    switch (action.type) {
        case usersActions.USERS_GET_SUCCESS:
            return action.payload.map(({ id, email, name, surname }) => ({ id, email, name, surname }))
        case sessionActions.SESSION_POST_SUCCESS:
            return state || [{
                id: action.payload.user.id,
                email: action.payload.user.email,
                name: action.payload.user.name,
                surname: action.payload.user.surname
            }]
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
export const getUser = (id, state) => (state.entries || []).find(u => u.id === id)
