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
        const { children } = this.props
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
                        <section>
                            <h3 className="section-title">Menu</h3>
                            <ul className="menu">
                                <li><MenuLink onClick={this.closeMenu} to="/sheet">Arkusz</MenuLink></li>
                                <li><MenuLink onClick={this.closeMenu} to="/summary">Podsumowanie</MenuLink></li>
                            </ul>
                        </section>
                        <section>
                            <h3 className="section-title">Użytkownik</h3>
                            <p>Jesteś zalogowany jako<br /><strong>zdzisiek@gmail.com</strong></p>
                            <ul className="menu">
                                <li><MenuLink onClick={this.closeMenu} to="/logout">Wyloguj się</MenuLink></li>
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