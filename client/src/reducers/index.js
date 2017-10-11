import { combineReducers } from 'redux'

import user, * as fromUser from './user'
import session, * as fromSession from './session'
import messages, * as fromMessages from './messages'

export default combineReducers({ user, session, messages })

export const getUserDidInvalidate = (state) => fromUser.getDidInvalidate(state.user)
export const getUserError = (state) => fromUser.getError(state.user)
export const getUserEmail = (state) => fromUser.getEmail(state.user)

export const getSessionDidInvalidate = (state) => fromSession.getDidInvalidate(state.session)
export const getSessionError = (state) => fromSession.getError(state.session)
export const getSessionToken = (state) => fromSession.getToken(state.session)

export const getMessages = (state) => fromMessages.getMessages(state.messages)

export const getIsUserLoggedIn = (state) => getSessionToken(state) !== null