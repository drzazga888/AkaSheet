import React from 'react'
import { connect } from 'react-redux'
import { denormalize } from 'normalizr'

import {
    getUsers,
    getRecipients, getRecipientsError, getRecipientsDidInvalidate,
    getTransactions, getTransactionsError, getTransactionsDidInvalidate
} from '../reducers'
import * as constants from '../constants'
import * as schemas from '../schemas'
import * as recipientsActions from '../actions/recipients'
import * as transactionsActions from '../actions/transactions'
import PageAlert, * as fromPageAlert from '../components/page-alert'
import Indeterminate from '../components/indeterminate'
import Transaction from '../components/transaction'

class ReceiptsPage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
        this.onTransactionClick = this.onTransactionClick.bind(this)
    }

    onTransactionClick(id) {
        this.setState({ selected: this.state.selected === id ? null : id })
    }

    componentDidMount() {
        if (!this.props.transactions && !this.props.transactionsDidInvalidate) {
            this.props.getTransactions()
        }
        if (!this.props.recipients && !this.props.recipientsDidInvalidate) {
            this.props.getRecipients()
        }
    }

    _renderTransactions() {
        const { transactions, users, recipients } = this.props
        const { selected } = this.state
        return Object.values(transactions).map(t => <Transaction
            key={t.id}
            {...denormalize(t, schemas.transaction, { users, recipients })}
            onClick={() => this.onTransactionClick(t.id)}
            selected={t.id === selected}
        />)
    }

    _assureData() {
        const { recipientsError, transactions, transactionsError } = this.props
        if (recipientsError || transactionsError) {
            return <PageAlert>{constants.MESSAGE_PAGE_ERROR(recipientsError || transactionsError)}</PageAlert>
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
    users: getUsers(state),
    recipients: getRecipients(state),
    recipientsError: getRecipientsError(state),
    recipientsDidInvalidate: getRecipientsDidInvalidate(state),
    transactions: getTransactions(state),
    transactionsError: getTransactionsError(state),
    transactionsDidInvalidate: getTransactionsDidInvalidate(state)
})

const mapDispatchToProps = {
    getTransactions: transactionsActions.getTransactions,
    getRecipients: recipientsActions.getRecipients
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage)