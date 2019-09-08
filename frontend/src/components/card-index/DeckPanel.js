import React from 'react'

const DeckPanel = ({ deckCards, storeDeckName, removeCardFromDeck, saveDeck }) => {
  return (
    <div className="container">
      <br />
      <nav className="panels">
        <div className="panel-heading">
          <input
            className="input"
            name="deckName"
            placeholder="Enter deck name"
            onChange={storeDeckName}
          />
        </div>
        <div className="panel-block">
          <button className="button is-half">Restart</button>
          <button
            className="button is-half"
            onClick={saveDeck}
          >Save</button>
          <button className="button is-half">Delete</button>
        </div>
        <div className="deck-cards">
          {deckCards.map(card =>
            <div
              key={card.id}
              className="panel-block"
              onClick={() => removeCardFromDeck(card)}
            >
              <p>{card.name}</p>
            </div>
          )}
        </div>
      </nav>

    </div>
  )
}

export default DeckPanel
