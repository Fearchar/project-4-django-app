import React from 'react'

const DeckCard = ({ card, removeCardFromDeck }) => {
  const manaIcons = card.manaCost.toLowerCase().split('').map((colour, i) =>
    <i
      key={i}
      className={`ms ms-${colour} ms-cost`}
    ></i>
  )
  if (manaIcons.length === 0) manaIcons.push(<i key="0" className="ms ms-land ms-2x"></i>)
  return (
    <div
      className="panel-block"
      onClick={() => removeCardFromDeck(card)}
    >
      <p>{manaIcons.map(icon => icon)} {card.name}</p>
    </div>
  )
}

export default DeckCard
