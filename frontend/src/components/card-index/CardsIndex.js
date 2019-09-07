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
      cards: [],
      deckPanelOpen: true,
      deckCards: [],
      deckName: '? Test Deck ?'
    }
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
  }

  addCardToDeck(card) {
    const deckCards = [...this.state.deckCards, card]
    deckCards.sort((a, b) => {
      if (a.name < b.name) return -1
      if (b.name < a.name) return 1
    })
    this.setState({ deckCards })
  }

  saveDeck() {
    const cardIds = this.state.deckCards.map(card => card.id)
    const deckRequest = {
      name: this.state.deckName,
      // !!! Need to change this to pk here and on the backend, once you have auth up and running
      created_by_pk: 'Test',
      win_rate: null,
      card_pks: cardIds
    }
    axios.post('/api/decks/', deckRequest)
      .then(res => console.log(res.data))
      // !!! .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    axios.get('/api/cards/0')
      .then(res => this.setState({cards: res.data}))
  }

  render() {
    if (!this.state.cards[1]) return <h1>Loading...</h1>
    return (
      <div className="container">
        <div className="columns">
          <div className={`column ${!this.state.deckPanelOpen ? 'is-11' : 'is-9'}`}>
            <FilterBar />
            <PaginationBar />
            <CardColumns
              cards={this.state.cards}
              addCardToDeck={this.addCardToDeck}
            />
            <PaginationBar />
          </div>
          <div className={`column ${!this.state.deckPanelOpen ? 'is-1' : 'is-4'}`}>
            {this.state.deckPanelOpen ? <DeckPanel
              deckCards={this.state.deckCards}
              saveDeck={this.saveDeck}
            /> : ''}
          </div>
        </div>
      </div>
    )
  }

}

export default CardsIndex
