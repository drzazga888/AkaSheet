import { combineReducers } from 'redux'

import user, * as fromUser from './user'
import messages, * as fromMessages from './messages'

export default combineReducers({ user, messages })

export const getDidInvalidate = (state) => fromUser.getDidInvalidate(state.user)
export const getError = (state) => fromUser.getError(state.user)

export const getMessages = (state) => fromMessages.getMessages(state.messages)