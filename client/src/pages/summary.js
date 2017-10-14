import React from 'react'
import { connect } from 'react-redux'

import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

const SummaryPage = ({ isUserLoggedIn }) => {
    return (
        <div>
            <h2 className="page-title">Podsumowanie</h2>
            <PageAlert>Jeszcze to robimy, sory</PageAlert>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)