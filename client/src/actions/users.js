import { normalize } from 'normalizr'
import { push } from 'react-router-redux'

import * as api from '../api'
import * as schemas from '../schemas'
import * as messageActions from './messages'
import { getSessionToken } from '../reducers'

export const USER_POST_REQUEST = 'USER_POST_REQUEST'
export const USER_POST_SUCCESS = 'USER_POST_SUCCESS'
export const USER_POST_FAILURE = 'USER_POST_FAILURE'
export const USER_GET_REQUEST = 'USER_GET_REQUEST'
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS'
export const USER_GET_FAILURE = 'USER_GET_FAILURE'

const MESSAGE_USER_POST_SUCCESS = 'Rejestracja przebiegła pomyślnie. Musisz poczekać na decyzję administratora zanim będziesz mógł się zalogować.'
const MESSAGE_USER_GET_SUCCESS = 'Zostałeś zalogowany pomyślnie!'

export const postUser = (form) => (dispatch) => {
    dispatch({ type: USER_POST_REQUEST })
    return api.postUser(form).then(
        (payload) => {
            dispatch({ type: USER_POST_SUCCESS, payload, form })
            dispatch(push('/'))
            messageActions.addSuccessMessage(MESSAGE_USER_POST_SUCCESS)(dispatch)
        },
        (error) => {
            dispatch({ type: USER_POST_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}

export const getUser = (id, token) => (dispatch) => {
    dispatch({ type: USER_GET_REQUEST })
    return api.getUser(id, token).then(
        (payload) => {
            dispatch(Object.assign({ type: USER_GET_SUCCESS, session: { id, token }}, normalize(payload, schemas.extendedUser)))
            messageActions.addSuccessMessage(MESSAGE_USER_GET_SUCCESS)(dispatch)
        },
        (error) => {
            dispatch({ type: USER_GET_FAILURE, error })
            messageActions.addErrorFromResponseCode(error)(dispatch)
        }
    )
}