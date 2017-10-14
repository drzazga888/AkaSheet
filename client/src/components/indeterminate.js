import React from 'react'

const Indeterminate = ({ children }) => (
    <div className="indeterminate">
        <i className="icon-spin2 animate-spin indeterminate-spin"></i>
        <div className="indeterminate-text">{children}</div>
    </div>
)

Indeterminate.defaultProps = {
    children: 'Ładowanie...'
}

export default Indeterminate