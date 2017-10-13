import React from 'react'
import { connect } from 'react-redux'

import { getSessionUserId } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

class ReceiptsPage extends React.PureComponent {

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div>
                <h2 className="page-title">Wpisy</h2>
                { isUserLoggedIn ? <Indeterminate /> : <PageAlert>{fromPageAlert.SIGN_IN_REQUIRED}</PageAlert> }
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage)