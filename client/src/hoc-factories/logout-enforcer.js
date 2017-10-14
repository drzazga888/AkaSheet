import React from 'react'
import { connect } from 'react-redux'

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
                        <h2 className="page-title">Prośba wylogowania</h2>
                        <PageAlert>{fromPageAlert.LOG_OUT_REQUIRED}</PageAlert>
                    </div>
                )
            }
            return <PageComponent {...this.props} />
        }

    }

)