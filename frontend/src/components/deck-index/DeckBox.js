import React from 'react'
import { Link } from 'react-router-dom'

const DeckBox = ({ deck }) => {
  return(
    <Link
      to={`/decks/edit/${deck.id}`}
      className="column is-one-quarter"
    >
      <div className="box card-font has-text-centered"
      >
        <div>
          <p className="title is-4 has-text-weight-bold">{deck.name}</p>
          <figure className="image">
            <img
              src={deck.imageUrl}
              alt={deck.name}
            />
          </figure>
          <br />
          <p className="has-text-weight-bold">{`Created by: ${deck.created_by.username}`}</p>
          <p className="has-text-weight-bold">{`Win Rate %: ${deck.win_rate || '-'}`}</p>
        </div>
      </div>
    </Link>
  )
}

export default DeckBox
