import { combineReducers } from 'redux'

import * as userActions from '../actions/user'

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

export default combineReducers({ didInvalidate })

export const getDidInvalidate = (state) => state.didInvalidate