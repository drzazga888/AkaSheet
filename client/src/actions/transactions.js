import * as api from '../api'
import * as messageActions from './messages'
import { getSessionToken } from '../reducers'

export const TRANSACTIONS_GET_REQUEST = 'TRANSACTIONS_GET_REQUEST'
export const TRANSACTIONS_GET_SUCCESS = 'TRANSACTIONS_GET_SUCCESS'
export const TRANSACTIONS_GET_FAILURE = 'TRANSACTIONS_GET_FAILURE'

export const getTransactions = () => (dispatch, getState) => {
    const state = getState()
    const sessionToken = getSessionToken(state)
    dispatch({ type: TRANSACTIONS_GET_REQUEST })
    return api.getTransactions(sessionToken).then(
        (payload) => {
            dispatch({ type: TRANSACTIONS_GET_SUCCESS, payload })
        },
        (error) => {
            dispatch({ type: TRANSACTIONS_GET_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}