import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/fontello.css'
import './css/animation.css'
import './css/styles.scss'

import * as sessionActions from './actions/session'
import { getMessages, getSessionUser, getLocation } from './reducers'
import Message from './components/message'

const MenuLink = (props) => <NavLink activeClassName="active" {...props} />

class Layout extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            menuOpened: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
        this.logout = this.logout.bind(this)
    }

    toggleMenu() {
        this.setState({ menuOpened: !this.state.menuOpened })
    }

    closeMenu() {
        this.setState({ menuOpened: false })
    }

    logout() {
        this.props.deleteSession()
        this.closeMenu()
    }

    render() {
        const { children, userEmail, messages } = this.props
        const { menuOpened } = this.state
        return (
            <div className={`app${menuOpened ? ' menu-opened' : ''}`}>
                <header className="top-bar">
                    <h1 className="app-header">
                        <MenuLink onClick={this.closeMenu} exact to="/">&#36;.R.A.C.Z.</MenuLink>
                    </h1>
                    <button className="menu-toggler" onClick={this.toggleMenu}>
                        <i className={menuOpened ? 'icon-cancel' : 'icon-menu'}></i>
                    </button>
                    <div className="app-nav-overlay" onClick={this.closeMenu}>
                        <nav className="app-nav" onClick={e => e.stopPropagation()}>
                            <section>
                                <h3 className="section-title">Zarządzaj paragonami</h3>
                                <ul className="menu">
                                    <li><MenuLink onClick={this.closeMenu} to="/entries">Wpisy</MenuLink></li>
                                    <li><MenuLink onClick={this.closeMenu} to="/summary">Podsumowanie</MenuLink></li>
                                </ul>
                            </section>
                            <section>
                                <h3 className="section-title">Użytkownik</h3>
                                { userEmail ?
                                <p>Jesteś zalogowany jako<br /><strong>{userEmail}</strong></p> :
                                <p>Aktualnie nie jesteś zalogowany</p> }
                                <ul className="menu">
                                    { !userEmail ? <li><MenuLink onClick={this.closeMenu} to="/sign-up">Zarejestruj się</MenuLink></li> : null }
                                    { !userEmail ? <li><MenuLink onClick={this.closeMenu} to="/sign-in">Zaloguj się</MenuLink></li> : null }
                                    { userEmail ? <li><a href="javascript:void(0)" onClick={this.logout}>Wyloguj się</a></li> : null }
                                </ul>
                            </section>
                        </nav>
                    </div>
                </header>
                <ReactCSSTransitionGroup
                    className="app-messages"
                    transitionName="message"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {messages.map(m => <Message key={m.date} {...m} />)}
                </ReactCSSTransitionGroup>
                <div className="app-scrollable">
                    <main className="app-content">
                        {children}
                    </main>
                    <footer className="bottom-bar">
                        <section>
                            <h3 className="section-title">Autorzy</h3>
                            <ul>
                                <li>Tomasz Bajorek (API)</li>
                                <li>Kamil Drzazga (Client)</li>
                            </ul>
                        </section>
                    </footer>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    messages: getMessages(state),
    userEmail: (getSessionUser(state) || {}).email,
    location: getLocation(state)
})

const mapDispatchToProps = {
    deleteSession: sessionActions.deleteSession
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)