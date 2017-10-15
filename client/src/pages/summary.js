import React from 'react'
import { connect } from 'react-redux'

import * as summaryActions from '../actions/summary'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

class SummaryPage extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getSummary()
    }

    render() {
        return (
            <div>
                <h2 className="page-title">Podsumowanie</h2>
                <PageAlert>Jeszcze to robimy, sory</PageAlert>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    getSummary: summaryActions.getSummary
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage)