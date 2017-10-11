import React from 'react'

export const RESOURCE_NOT_FOUND = <span>Wybrany zasób nie istnieje.</span>
export const SIGN_IN_REQUIRED = <span>Zawartość na tej stronie dostępna jest tylko dla zalogowanych użytkowników.</span>
export const LOG_OUT_REQUIRED = <span>Zawartośc na tej stronie dostępna jest tylko dla niezalogowanych użytkowników.</span>

const PageAlert = ({ children }) => (
    <div className="page-alert">
        <i className="page-alert-icon icon-attention"></i>
        <div className="page-alert-message">{children}</div>
    </div>
)

export default PageAlert