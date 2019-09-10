import React from 'react'

const DeckPanel = ({ deck, storeDeckDetails, removeCardFromDeck, saveDeck }) => {
  const deckCards = deck.cards
  return (
    <div className="container">
      <br />
      <nav className="panels">
        <div className="panel-heading">
          <input
            className="input is-medium has-text-weight-medium"
            name="name"
            onChange={storeDeckDetails}
            value={deck.name}
          />
        </div>
        <div className="panel-block">
          <p>Win Rate</p>
          <input
            className="input is-medium has-text-weight-medium"
            type="number"
            min="0"
            max="100"
            name="win_rate"
            onChange={storeDeckDetails}
            value={deck.win_rate}
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
          </div>
        }
        <div className="deck-cards">
          {deckCards.map((card, i) =>
            <div
              key={i}
              className="panel-block"
              onClick={() => removeCardFromDeck(card)}
            >
              <p>{card.manaCost} {card.name}</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default DeckPanel
