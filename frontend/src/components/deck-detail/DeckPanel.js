import React from 'react'

import DeckCard from './DeckCard'

const DeckPanel = ({ deck, handleChange, removeCardFromDeck, saveDeck, deleteDeck }) => {
  const deckCards = deck.cards
  return (
    <div className="container">
      <br />
      <nav className="panels">
        <div className="panel-heading">
          <input
            className="input is-large has-text-weight-bold"
            name="name"
            onChange={handleChange}
            value={deck.name}
          />
        </div>
        <div className="panel-block win-rate">
          <p>Win Rate(%): </p>
          <input
            className="input is-medium has-text-weight-medium"
            type="number"
            name="win_rate"
            value={deck.win_rate}
            onChange={handleChange}
          />
        </div>
        <div className="panel-block">
          <button
            className="button"
            onClick={saveDeck}
          >Save</button>
          <button
            className="button"
            onClick={deleteDeck}
          >Delete</button>
        </div>
        {
          deck.saveMessage &&
          <div className="panel-block">
          </div>
        }
        <div className="deck-cards">
          {deckCards.map((card, i) =>
            <DeckCard
              key={i}
              card={card}
              removeCardFromDeck={removeCardFromDeck}
            />
          )}
        </div>
      </nav>
    </div>
  )
}

export default DeckPanel
