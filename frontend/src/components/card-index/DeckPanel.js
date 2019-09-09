import React from 'react'

const DeckPanel = ({ deck, storeDeckName, removeCardFromDeck, saveDeck }) => {
  const deckCards = deck.cards
  return (
    <div className="container">
      <br />
      <nav className="panels">
        <div className="panel-heading">
          <input
            className="input is-medium has-text-weight-medium"
            name="deckName"
            value={deck.name}
            onChange={storeDeckName}
          />
        </div>
        <div className="panel-block">
          <button
            className="button"
            onClick={saveDeck}
          >Save</button>
          <button className="button">Delete</button>
        </div>
        {
          deck.saveMessage &&
          <div className="panel-block">
            <small className="help is-primary has-text-weight-bold">{deck.saveMessage}</small>
          </div>
        }
        <div className="deck-cards">
          {deckCards.map((card, i) =>
            <div
              key={i}
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
