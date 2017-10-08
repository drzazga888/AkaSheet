import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'

import Layout from './layout'
import HomePage from './pages/home'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import ReceiptsPage from './pages/receipts'
import SummaryPage from './pages/summary'
import NotFoundPage from './pages/not-found'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/sign-in" component={SignInPage} />
                    <Route path="/sign-up" component={SignUpPage} />
                    <Route path="/entries" component={ReceiptsPage} />
                    <Route path="/summary" component={SummaryPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
)

export default App