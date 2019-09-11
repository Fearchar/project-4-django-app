import React from 'react'

const CardColumns = ({ cards, pageIndex, pageSize, addCardToDeck}) => {
  cards = cards.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  if (!cards[0]) return <h1 className="title">Loading...</h1>
  return (
    <div>
      <div className="columns is-mobile is-multiline">
        {cards.map(card =>
          <div
            key={card.id}
            className="column is-one-quarter-desktop is-one-quarter-tablet card-front is-half-mobile is-one-quarter-widescreen is-one-quarter-fullhd"
            onClick={() => addCardToDeck(card)}
          >
            {!card.imageUrl ? <h3>{card.name}</h3> :
              <figure className="image">
                <img src={card.imageUrl} alt={card.name} />
              </figure>}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardColumns
