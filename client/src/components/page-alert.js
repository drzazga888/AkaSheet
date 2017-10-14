import React from 'react'

const PageAlert = ({ children }) => (
    <div className="page-alert">
        <i className="page-alert-icon icon-emo-cry"></i>
        <div className="page-alert-message">{children}</div>
    </div>
)

export default PageAlert