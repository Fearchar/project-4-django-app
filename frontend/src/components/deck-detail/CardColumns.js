import React from 'react'

const CardColumns = ({ mode, cards, pageIndex, pageSize, addCardToDeck}) => {
  cards = cards.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  if (!cards[0]) return <h1 className="title">Loading...</h1>
  return (
    <div>
      <div className={`columns is-variable is-mobile is-multiline ${mode === 'show' ? 'is-8' : 'is-2'}`}>
        {cards.map((card, i) =>
          <div
            key={i}
            className={`${mode !== 'show' && 'card-front'} column is-one-quarter-desktop is-one-quarter-tablet is-half-mobile is-one-quarter-widescreen is-one-quarter-fullhd`}
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
