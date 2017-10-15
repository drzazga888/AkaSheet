import { combineReducers } from 'redux'

import * as summaryActions from '../actions/summary'
import * as sessionActions from '../actions/session'

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case summaryActions.SUMMARY_GET_REQUEST:
            return true
        case summaryActions.SUMMARY_GET_SUCCESS:
        case summaryActions.SUMMARY_GET_FAILURE:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case summaryActions.SUMMARY_GET_REQUEST:
            return null
        case summaryActions.SUMMARY_GET_FAILURE:
            return action.error
        default:
            return state
    }
}

const data = (state = null, action) => {
    switch (action.type) {
        case summaryActions.SUMMARY_GET_SUCCESS:
            return action.payload
        case sessionActions.SESSION_DELETE_SUCCESS:
            return null
        default:
            return state
    }
}

export default combineReducers({ didInvalidate, error, data })

export const getDidInvalidate = (state) => state.didInvalidate
export const getError = (state) => state.error
export const getSummary = (state) => state.data