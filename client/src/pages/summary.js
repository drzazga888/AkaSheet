import React from 'react'
import { connect } from 'react-redux'

import { getIsUserLoggedIn } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'

const SummaryPage = ({ isUserLoggedIn }) => {
    return (
        <div>
            <h2 className="page-title">Podsumowanie</h2>
            { isUserLoggedIn ? <p>Summary</p> : <PageAlert>{fromPageAlert.SIGN_IN_REQUIRED}</PageAlert> }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isUserLoggedIn: getIsUserLoggedIn(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)