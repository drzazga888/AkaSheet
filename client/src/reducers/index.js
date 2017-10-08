import { combineReducers } from 'redux'

import user, * as fromUser from './user'

export default combineReducers({ user })

export const getDidInvalidate = (state) => fromUser.getDidInvalidate(state.user)