import * as sessionActions from '../actions/session'

export default store => next => action => {
    if (action.type === sessionActions.SESSION_POST_SUCCESS) {
        const { token, user } = action.result
        sessionStorage.setItem('clientSession', JSON.stringify({ token, user }))
    }
    return next(action)
}