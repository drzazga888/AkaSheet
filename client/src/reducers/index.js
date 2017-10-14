import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import users, * as fromUsers from './users'
import session, * as fromSession from './session'
import messages, * as fromMessages from './messages'
import recipients, * as fromRecipients from './recipients'
import transactions, * as fromTransactions from './transactions'

export default combineReducers({ users, session, messages, recipients, transactions, router })

export const getUserDidInvalidate = (state) => fromUsers.getDidInvalidate(state.users)
export const getUserError = (state) => fromUsers.getError(state.users)
export const getUsers = (state) => fromUsers.getUsers(state.users)
export const getUser = (id, state) => fromUsers.getUser(id, state.users)

export const getSessionDidInvalidate = (state) => fromSession.getDidInvalidate(state.session)
export const getSessionError = (state) => fromSession.getError(state.session)
export const getSessionToken = (state) => fromSession.getToken(state.session)
export const getSessionUserId = (state) => fromSession.getUserId(state.session)
export const getSessionUser = (state) => getUser(getSessionUserId(state), state)

export const getRecipientsDidInvalidate = (state) => fromRecipients.getDidInvalidate(state.recipients)
export const getRecipientsError = (state) => fromRecipients.getError(state.recipients)
export const getRecipients = (state) => fromRecipients.getRecipients(state.recipients)

export const getTransactionsDidInvalidate = (state) => fromTransactions.getDidInvalidate(state.transactions)
export const getTransactionsError = (state) => fromTransactions.getError(state.transactions)
export const getTransactions = (state) => fromTransactions.getTransactions(state.transactions)

export const getMessages = (state) => fromMessages.getMessages(state.messages)

export const getLocation = (state) => state.router.location