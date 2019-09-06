import React from 'react'

const PaginationBar = () => {
  return (
    <div>
      <div className="container columns is-multiline is-centered">
        <div className="column is-1 has-text-centered">
          <button className="button">LL</button>
        </div>
        <div className="column is-1 has-text-centered">
          <button className="button">L</button>
        </div>
        <div className="column is-8 has-text-centered">
          <button className="button">Other</button>
        </div>
        <div className="column is-1 has-text-centered">
          <button className="button">R</button>
        </div>
        <div className="column is-1 has-text-centered">
          <button className="button">RR</button>
        </div>
      </div>
    </div>
  )
}

export default PaginationBar
