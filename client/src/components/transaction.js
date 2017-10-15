import React from 'react'
import Tile from './tile'

const Transaction = ({ product, purchase_date, cost, buyer, recipient, onClick, paid }) => {
    return (
        <article className={`transaction${paid ? ' paid' : ''}`} onClick={onClick}>
            <header className="transaction-header">
                <h3 className="product-name">{product}</h3>
                <span className="cost"><strong className="value">{cost}</strong> zł</span>
            </header>
            <div className="transaction-summary tiles">
                <Tile label="Zakupione przez">{buyer.name} {buyer.surname}</Tile>
                <Tile label="Dla">{recipient.name}</Tile>
                <Tile label="W dniu">{purchase_date}</Tile>
            </div>
        </article>
    )
}

export default Transaction