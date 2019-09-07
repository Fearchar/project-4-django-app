import React from 'react'

const CardColumns = ({ cards }) => {
  return (
    <div className="columns is-multiline">
      {cards.map(card =>
        <div
          key={card.id}
          className="column is-one-quarter"
        >
          {!card.imageUrl ? <h3>{card.name}</h3> :
            <figure className="image">
              <img src={card.imageUrl} alt={card.name} />
            </figure>}
        </div>
      )}
    </div>
  )
}

export default CardColumns
