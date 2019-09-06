import React from 'react'
import axios from 'axios'

import FilterBar from './common/FilterBar'
import PaginationBar from './common/PaginationBar'

class CardsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    axios.get('/api/cards/0')
      .then(res => this.setState({cards: res.data}))
  }

  render() {
    console.log(this.state)
    if (!this.state.cards[1]) return <h1>Loading...</h1>
    return (
      <div className="container">
        <FilterBar />
        <PaginationBar />
        <div className="columns is-multiline">
          {this.state.cards.map(card =>
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
        <PaginationBar />
      </div>
    )
  }

}

export default CardsIndex
