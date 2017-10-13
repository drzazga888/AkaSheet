import React from 'react'
import { connect } from 'react-redux'

import {
    getSessionUserId, getUsers,
    getRecipients, getRecipientsError, getRecipientsDidInvalidate,
    getTransactions, getTransactionsError, getTransactionsDidInvalidate
} from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'

class ReceiptsPage extends React.PureComponent {

    _renderTransactions() {
        const { transactions } = this.props
        return <pre>{JSON.stringify(transactions, null, 4)}</pre>
    }

    _assureData() {
        const {
            isUserLoggedIn,
            recipientsError,
            transactions, transactionsError
        } = this.props
        if (!isUserLoggedIn) {
            return <PageAlert>{fromPageAlert.SIGN_IN_REQUIRED}</PageAlert>
        } else if (recipientsError || transactionsError) {
            return <PageAlert>{fromPageAlert.GENERAL_ERROR}</PageAlert>
        } else if (!transactions) {
            return <Indeterminate />
        } else {
            return this._renderTransactions()
        }
    }

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div>
                <h2 className="page-title">Wpisy</h2>
                {this._assureData()}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isUserLoggedIn: getSessionUserId(state) !== null,
    users: getUsers(state),
    recipients: getRecipients(state),
    recipientsError: getRecipientsError(state),
    recipientsDidInvalidate: getRecipientsDidInvalidate(state),
    transactions: getTransactions(state),
    transactionsError: getTransactionsError(state),
    transactionsDidInvalidate: getTransactionsDidInvalidate(state)
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage)