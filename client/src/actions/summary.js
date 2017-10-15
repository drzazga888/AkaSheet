import * as api from '../api'
import * as messageActions from './messages'
import { getSessionToken } from '../reducers'

export const SUMMARY_GET_REQUEST = 'SUMMARY_GET_REQUEST'
export const SUMMARY_GET_SUCCESS = 'SUMMARY_GET_SUCCESS'
export const SUMMARY_GET_FAILURE = 'SUMMARY_GET_FAILURE'

export const getSummary = () => (dispatch, getState) => {
    const state = getState()
    const sessionToken = getSessionToken(state)
    dispatch({ type: SUMMARY_GET_REQUEST })
    return api.getSummary(sessionToken).then(
        (payload) => {
            dispatch({ type: SUMMARY_GET_SUCCESS, payload })
        },
        (error) => {
            dispatch({ type: SUMMARY_GET_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}