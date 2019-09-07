import React from 'react'

const DeckPanel = ({ deckCards, storeDeckName, saveDeck }) => {
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
