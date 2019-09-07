import React from 'react'

const DeckPanel = () => {
  const arr = '_'.repeat(100).split('')
  console.log(arr)
  return (
    <div className="container that">
      <br />
      <nav className="panels">
        <p className="panel-heading">
          Deck Builder / Deck Name
        </p>
        <div className="this">

          {
            arr.map((item , i) =>
              <div
                key={i}
                className="panel-block"
              >
                <p>Card</p>
              </div>
            )
          }
        </div>
      </nav>

    </div>
  )
}

export default DeckPanel
