import React from 'react'

const Message = ({ message, severity }) => (
    <div className={`message severity-${severity}`}>{message}</div>
)

export default Message