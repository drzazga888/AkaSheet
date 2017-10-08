import React from 'react'

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
        e.preventDefault();
        alert('login')
    }

    onChangeValue({ target }) {
        this.setState({ [target.name]: target.value })
    }

    render() {
        const { email, password } = this.state
        return (
            <div>
                <section>
                    <h3 className="section-title">Zaloguj się</h3>
                    <form className="form" onSubmit={this.onSubmit}>
                        <label className="form-row">
                            <span className="form-row-label">E-mail</span>
                            <input className="form-row-content" type="email" value={email} name="email" onChange={this.onChangeValue} required/>
                        </label>
                        <label className="form-row">
                            <span className="form-row-label">Hasło</span>
                            <input className="form-row-content" type="password" value={password} name="password" onChange={this.onChangeValue} required />
                        </label>
                        <label className="form-confirm">
                            <button type="confirm">Zaloguj się</button>
                        </label>
                    </form>
                </section>
            </div>
        )
    }
}

export default SignInPage