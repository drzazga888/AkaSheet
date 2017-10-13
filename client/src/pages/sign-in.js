import React from 'react'
import { connect } from 'react-redux'

import * as sessionActions from '../actions/session'
import { getSessionDidInvalidate, getSessionError, getSessionUserId } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'

class SignInPage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.didInvalidate && !nextProps.didInvalidate && !nextProps.error) {
            this.props.history.push('/entries')
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.postSession(this.state)
    }


    onChangeValue({ target }) {
        this.setState({ [target.name]: target.value })
    }

    _renderContent() {
        const { email, password } = this.state
        const { didInvalidate } = this.props
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <fieldset disabled={didInvalidate}>
                    <label className="form-row">
                        <span className="form-row-label">E-mail</span>
                        <input className="form-row-content" type="email" value={email} name="email" onChange={this.onChangeValue} required/>
                    </label>
                    <label className="form-row">
                        <span className="form-row-label">Hasło</span>
                        <input className="form-row-content" type="password" value={password} name="password" onChange={this.onChangeValue} required />
                    </label>
                    <label className="form-confirm">
                        <button type="confirm">{didInvalidate ? 'Czekaj...' : 'Zaloguj się'}</button>
                    </label>
                </fieldset>
            </form>
        )
    }

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div>
                <h2 className="page-title">Panel logowania</h2>
                { !isUserLoggedIn ? this._renderContent() : <PageAlert>{fromPageAlert.LOG_OUT_REQUIRED}</PageAlert> }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    didInvalidate: getSessionDidInvalidate(state),
    error: getSessionError(state),
    isUserLoggedIn: getSessionUserId(state) !== null
})

const mapDispatchToProps = {
    postSession: sessionActions.postSession
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)