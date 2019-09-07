import React from 'react'
import axios from 'axios'

import DeckPanel from './DeckPanel'
import FilterBar from '../common/FilterBar'
import PaginationBar from '../common/PaginationBar'
import CardColumns from './CardColumns'

class CardsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      deckPanelOpen: true,
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
        <div className="columns">
          <div className={`column ${!this.state.deckPanelOpen ? 'is-11' : 'is-9'}`}>
            <FilterBar />
            <PaginationBar />
            <CardColumns cards={this.state.cards} />
            <PaginationBar />
          </div>
          <div className={`column ${!this.state.deckPanelOpen ? 'is-1' : 'is-4'}`}>
            <DeckPanel />
          </div>
        </div>
      </div>
    )
  }

}

export default CardsIndex
