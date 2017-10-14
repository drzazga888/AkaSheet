import React from 'react'
import { connect } from 'react-redux'

import * as userActions from '../actions/users'
import { getSessionUserId, getSessionDidInvalidate, getSessionError } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null,
    sessionDidInvalidate: getSessionDidInvalidate(state),
    sessionDidError: getSessionError(state)
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
            const { isUserLoggedIn, sessionDidInvalidate, sessionDidError } = this.props
            if (sessionDidInvalidate) {
                return <Indeterminate>Logowanie...</Indeterminate>
            } else if (sessionDidError === 401) {
                return <PageAlert>Sesja wygasła. Musisz zalogować się ponownie.</PageAlert>
            } else if (sessionDidError) {
                return <PageAlert>{fromPageAlert.GENERAL_ERROR}</PageAlert>
            } else if (!isUserLoggedIn) {
                return <PageAlert>{fromPageAlert.SIGN_IN_REQUIRED}</PageAlert>
            } else {
                return null
            }
        }
        
        render() {
            const msg = this._hijackRenderMessage()
            if (msg) {
                return (
                    <div>
                        <h2 className="page-title">Przywracanie sesji</h2>
                        {msg}
                    </div>
                )
            }
            return <PageComponent {...this.props} />
        }

    }

)