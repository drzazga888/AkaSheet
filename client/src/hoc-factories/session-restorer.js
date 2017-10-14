import React from 'react'
import { connect } from 'react-redux'

import * as constants from '../constants'
import * as userActions from '../actions/users'
import { getSessionUserId, getSessionDidInvalidate, getSessionError } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null,
    sessionDidInvalidate: getSessionDidInvalidate(state),
    sessionError: getSessionError(state)
})

const mapDispatchToProps = {
    getUser: userActions.getUser
}

export default (PageComponent) => connect(mapStateToProps, mapDispatchToProps)(
    
    class SessionRestorer extends React.PureComponent {

        componentDidMount() {
            const { isUserLoggedIn, sessionDidInvalidate } = this.props
            if (!isUserLoggedIn && !sessionDidInvalidate) {
                const savedSession = sessionStorage.getItem('clientSession')
                if (savedSession) {
                    const { token, user } = JSON.parse(savedSession)
                    this.props.getUser(user, token)
                }
            }
        }

        _hijackRenderMessage() {
            const { isUserLoggedIn, sessionDidInvalidate, sessionError } = this.props
            if (sessionDidInvalidate) {
                return <Indeterminate />
            } else if (sessionError === 401) {
                return <PageAlert>{constants.MESSAGE_PAGE_SESSION_GONE}</PageAlert>
            } else if (sessionError) {
                return <PageAlert>{constants.MESSAGE_PAGE_ERROR(sessionError)}</PageAlert>
            } else if (!isUserLoggedIn) {
                return <PageAlert>{constants.MESSAGE_PAGE_SIGN_IN_NEEDED}</PageAlert>
            } else {
                return null
            }
        }
        
        render() {
            const msg = this._hijackRenderMessage()
            if (msg) {
                return (
                    <div>
                        <h2 className="page-title">Zarządzanie sesją</h2>
                        {msg}
                    </div>
                )
            }
            return <PageComponent {...this.props} />
        }

    }

)