import { combineReducers } from 'redux'

import * as transactionsActions from '../actions/transactions'
import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case transactionsActions.TRANSACTIONS_GET_REQUEST:
            return true
        case transactionsActions.TRANSACTIONS_GET_SUCCESS:
        case transactionsActions.TRANSACTIONS_GET_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case transactionsActions.TRANSACTIONS_GET_REQUEST:
            return null
        case transactionsActions.TRANSACTIONS_GET_FAILURE:
            return action.error
        default:
            return state
    }
}

const entries = (state = null, action) => {
    switch (action.type) {
        case transactionsActions.TRANSACTIONS_GET_SUCCESS:
            return action.entities.transactions
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, entries })