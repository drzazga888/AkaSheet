import React from 'react'
import { connect } from 'react-redux'

import { getSessionUserId } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

const SummaryPage = ({ isUserLoggedIn }) => {
    return (
        <div>
            <h2 className="page-title">Podsumowanie</h2>
            { isUserLoggedIn ? <PageAlert>Jeszcze to robimy, sory</PageAlert> : <PageAlert>{fromPageAlert.SIGN_IN_REQUIRED}</PageAlert> }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)