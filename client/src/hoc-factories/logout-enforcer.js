import React from 'react'
import { connect } from 'react-redux'

import * as constants from '../constants'
import { getSessionUserId } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null
})

const mapDispatchToProps = {
}

export default (PageComponent) => connect(mapStateToProps, mapDispatchToProps)(
    
    class LogoutEnforcer extends React.PureComponent {
        
        render() {
            if (this.props.isUserLoggedIn) {
                return (
                    <div>
                        <h2 className="page-title">Zasób dla niezalowowanych</h2>
                        <PageAlert>{constants.MESSAGE_PAGE_LOG_OUT_NEEDED}</PageAlert>
                    </div>
                )
            }
            return <PageComponent {...this.props} />
        }

    }

)