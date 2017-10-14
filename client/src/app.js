import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import Layout from './layout'
import HomePage from './pages/home'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import ReceiptsPage from './pages/receipts'
import SummaryPage from './pages/summary'
import NotFoundPage from './pages/not-found'
import reducer from './reducers'
import sessionSaver from './middlewares/session-saver'
import withSessionRestorer from './hoc-factories/session-restorer'
import withLogoutEnforcer from './hoc-factories/logout-enforcer'

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, routerMiddleware(history), sessionSaver)))

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/sign-in" component={withLogoutEnforcer(SignInPage)} />
                    <Route path="/sign-up" component={withLogoutEnforcer(SignUpPage)} />
                    <Route path="/entries" component={withSessionRestorer(ReceiptsPage)} />
                    <Route path="/summary" component={withSessionRestorer(SummaryPage)} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>
)

export default App