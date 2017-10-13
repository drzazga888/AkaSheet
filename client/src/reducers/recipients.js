import { combineReducers } from 'redux'

import * as recipientsActions from '../actions/recipients'
import * as sessionActions from '../actions/session'
import * as transactionsActions from '../actions/transactions'

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
        case transactionsActions.TRANSACTIONS_GET_SUCCESS:
            return Object.assign({}, action.entities.recipients, state)
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, entries })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getRecipients = (state) => state.entries