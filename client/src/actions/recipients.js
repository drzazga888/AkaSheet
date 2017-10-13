import { normalize } from 'normalizr'

import * as api from '../api'
import * as schemas from '../schemas'
import * as messageActions from './messages'
import { getSessionToken } from '../reducers'

export const RECIPIENTS_GET_REQUEST = 'RECIPIENTS_GET_REQUEST'
export const RECIPIENTS_GET_SUCCESS = 'RECIPIENTS_GET_SUCCESS'
export const RECIPIENTS_GET_FAILURE = 'RECIPIENTS_GET_FAILURE'

export const getRecipients = () => (dispatch, getState) => {
    const state = getState()
    const sessionToken = getSessionToken(state)
    dispatch({ type: RECIPIENTS_GET_REQUEST })
    return api.getRecipients(sessionToken).then(
        (payload) => {
            dispatch(Object.assign({ type: RECIPIENTS_GET_SUCCESS }, normalize(payload, [schemas.recipient])))
        },
        (error) => {
            dispatch({ type: RECIPIENTS_GET_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}

