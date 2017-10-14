import { normalize } from 'normalizr'
import { push } from 'react-router-redux'

import * as constants from '../constants'
import * as api from '../api'
import * as schemas from '../schemas'
import * as messageActions from './messages'
import * as transactionsActions from './transactions'
import * as recipientsActions from './recipients'
import { getSessionToken } from '../reducers'

export const SESSION_POST_REQUEST = 'SESSION_POST_REQUEST'
export const SESSION_POST_SUCCESS = 'SESSION_POST_SUCCESS'
export const SESSION_POST_FAILURE = 'SESSION_POST_FAILURE'

export const SESSION_DELETE_REQUEST = 'SESSION_DELETE_REQUEST'
export const SESSION_DELETE_SUCCESS = 'SESSION_DELETE_SUCCESS'
export const SESSION_DELETE_FAILURE = 'SESSION_DELETE_FAILURE'

export const postSession = (form) => (dispatch, getState) => {
    dispatch({ type: SESSION_POST_REQUEST })
    return api.postSession(form).then(
        (payload) => {
            dispatch(Object.assign({ type: SESSION_POST_SUCCESS, form }, normalize(payload, schemas.session)))
            dispatch(push('/entries'))
            messageActions.addSuccessMessage(constants.MESSAGE_SESSION_POST_SUCCESS)(dispatch)
        },
        (error) => {
            dispatch({ type: SESSION_POST_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}

export const deleteSession = () => (dispatch, getState) => {
    const state = getState()
    const sessionToken = getSessionToken(state)
    dispatch({ type: SESSION_DELETE_REQUEST })
    return api.deleteSession(sessionToken).then(
        (payload) => {
            dispatch({ type: SESSION_DELETE_SUCCESS, payload })
            dispatch(push('/'))
            messageActions.addSuccessMessage(constants.MESSAGE_SESSION_DELETE_SUCCESS)(dispatch)
        },
        (error) => {
            dispatch({ type: SESSION_DELETE_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}