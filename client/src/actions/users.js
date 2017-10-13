import * as api from '../api'
import * as messageActions from './messages'
import { getSessionToken } from '../reducers'

export const USER_POST_REQUEST = 'USER_POST_REQUEST'
export const USER_POST_SUCCESS = 'USER_POST_SUCCESS'
export const USER_POST_FAILURE = 'USER_POST_FAILURE'
export const USERS_GET_REQUEST = 'USERS_GET_REQUEST'
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS'
export const USERS_GET_FAILURE = 'USERS_GET_FAILURE'

const MESSAGE_USER_POST_SUCCESS = 'Rejestracja przebiegła pomyślnie. Musisz poczekać na decyzję administratora zanim będziesz mógł się zalogować.'

export const postUser = (form) => (dispatch) => {
    dispatch({ type: USER_POST_REQUEST })
    return api.postUser(form).then(
        (payload) => {
            dispatch({ type: USER_POST_SUCCESS, payload, form })
            messageActions.addSuccessMessage(MESSAGE_USER_POST_SUCCESS)(dispatch)
        },
        (error) => {
            dispatch({ type: USER_POST_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}

export const getUsers = () => (dispatch, getState) => {
    const state = getState()
    const token = getSessionToken(state)
    dispatch({ type: USERS_GET_REQUEST })
    return api.getUsers(token).then(
        (payload) => {
            dispatch({ type: USERS_GET_SUCCESS, payload })
        },
        (error) => {
            dispatch({ type: USERS_GET_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}