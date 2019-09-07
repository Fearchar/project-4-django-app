import React from 'react'

const DeckPanel = ({ deckCards, saveDeck }) => {
  return (
    <div className="container">
      <br />
      <nav className="panels">
        <p className="panel-heading">
          Deck Builder / Deck Name
        </p>
        <div className="panel-block">
          <button className="button is-half">Restart</button>
          <button
            className="button is-half"
            onClick={saveDeck}
          >Save</button>
          <button className="button is-half">Delete</button>
        </div>
        <div className="deck-cards">

          {
            deckCards.map((card , i) =>
              <div
                key={i}
                className="panel-block"
              >
                <p>{card.name}</p>
              </div>
            )
          }
        </div>
      </nav>

    </div>
  )
}

export default DeckPanel
