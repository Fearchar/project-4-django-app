import React from 'react'

const TopDecks = ({ decks }) => {
  return (
    <div
      className="columns"
    >
      {decks.map(deck =>
        <div key={deck.id} className="columns column">
          <div className="column is-half">
            <figure className="image">
              <img
                src={deck.imageUrl}
                alt={deck.name}
              />
            </figure>
          </div>
          <div className="column is-half">
            <h4 className="title is-3">{deck.name}</h4>
            <p className="has-text-weight-bold">{`Created by: ${deck.created_by.username}`}</p>
            <p className="has-text-weight-bold">{`Win Rate %: ${deck.win_rate || '-'}`}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopDecks
