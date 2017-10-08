import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './css/fontello.css'
import './css/styles.scss'

const MenuLink = (props) => <NavLink activeClassName="active" {...props} />

class Layout extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            menuOpened: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    toggleMenu() {
        this.setState({ menuOpened: !this.state.menuOpened })
    }

    closeMenu() {
        this.setState({ menuOpened: false })
    }

    render() {
        const { children, userEmail } = this.props
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
                    <nav className="app-nav">
                        { userEmail ? <section>
                            <h3 className="section-title">Zarządzaj paragonami</h3>
                            <ul className="menu">
                                <li><MenuLink onClick={this.closeMenu} to="/entries">Wpisy</MenuLink></li>
                                <li><MenuLink onClick={this.closeMenu} to="/summary">Podsumowanie</MenuLink></li>
                            </ul>
                        </section> : null}
                        <section>
                            <h3 className="section-title">Użytkownik</h3>
                            { userEmail ?
                            <p>Jesteś zalogowany jako<br /><strong>{userEmail}</strong></p> :
                            <p>Aktualnie nie jesteś zalogowany</p> }
                            <ul className="menu">
                                { !userEmail ? <li><MenuLink onClick={this.closeMenu} to="/sign-up">Zarejestruj się</MenuLink></li> : null }
                                { !userEmail ? <li><MenuLink onClick={this.closeMenu} to="/sign-in">Zaloguj się</MenuLink></li> : null }
                                { userEmail ? <li><MenuLink onClick={this.closeMenu} to="/logout">Wyloguj się</MenuLink></li> : null }
                            </ul>
                        </section>
                    </nav>
                </header>
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

export default withRouter(Layout)