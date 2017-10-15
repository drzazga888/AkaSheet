import React from 'react'

const Tile = ({ label, children }) => (
    <div className="tile buyer">
        <div className="tile-title">{label}</div>
        <div className="tile-content">{children}</div>
    </div>
)

export default Tile