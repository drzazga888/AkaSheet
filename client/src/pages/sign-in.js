import React from 'react'
import { connect } from 'react-redux'

import * as sessionActions from '../actions/session'
import { getSessionDidInvalidate, getSessionError } from '../reducers'

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

    onSubmit(e) {
        e.preventDefault()
        this.props.postSession(this.state)
    }

    onChangeValue({ target }) {
        this.setState({ [target.name]: target.value })
    }

    render() {
        const { email, password } = this.state
        const { didInvalidate } = this.props
        return (
            <div>
                <h2 className="page-title">Panel logowania</h2>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    didInvalidate: getSessionDidInvalidate(state),
    error: getSessionError(state)
})

const mapDispatchToProps = {
    postSession: sessionActions.postSession
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)