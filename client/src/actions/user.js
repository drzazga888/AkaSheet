import * as api from '../api'

export const USER_POST_REQUEST = 'USER_POST_REQUEST'
export const USER_POST_SUCCESS = 'USER_POST_SUCCESS'
export const USER_POST_FAILURE = 'USER_POST_FAILURE'

export const postUser = (form) => (dispatch) => {
    dispatch({ type: USER_POST_REQUEST })
    return api.postUser(form).then(
        (payload) => {
            dispatch({ type: USER_POST_SUCCESS, payload, form })
        },
        (error) => {
            dispatch({ type: USER_POST_FAILURE, error })
        }
    )
}