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
            return Object.assign({}, action.entities.transactions, state)
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, entries })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getTransactions = (state) => state.entries