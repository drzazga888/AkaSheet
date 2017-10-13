import React from 'react'
import { withRouter } from 'react-router-dom'

import PageAlert from '../components/page-alert'

const NotFoundPage = ({ location }) => (
    <div>
        <PageAlert>Strona <strong>{location.pathname}</strong> nie istnieje!</PageAlert>
    </div>
)

export default withRouter(NotFoundPage)