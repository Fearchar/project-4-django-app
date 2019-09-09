import React from 'react'

const DeckPanel = ({ deck, storeDeckName, removeCardFromDeck, saveDeck }) => {
  const deckCards = deck.cards
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
          <button
            className="button is-half"
            onClick={saveDeck}
          >Save</button>
          <button className="button is-half">Delete</button>
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
