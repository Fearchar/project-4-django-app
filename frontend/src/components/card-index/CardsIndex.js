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
      cardPageIndex: 0,
      prevCardPageIndex: 0,
      totalPages: null,
      cards: [],
      deckPanelOpen: true,
      deckCards: [],
      deckName: null
    }
    this.storeDeckName = this.storeDeckName.bind(this)
    this.changePage = this.changePage.bind(this)
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
  }

  // !!! Consider changing so it doesn't set state if the number is the same. Check with Mike whether React checks if theres been a meaningful change.
  changePage(index){
    if (index >= 0) this.setState({ cardPageIndex: index })
    else this.setState({ cardPageIndex: 0 })
  }

  storeDeckName(e) {
    console.log('handelDeckNameChange')
    this.setState({ deckName: e.target.value })
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

  getCardPage(num) {
    axios.get(`/api/cards?page=${num}`)
      // !!! Could send user to a 404 site if they have errors. Even if it's just a h tag.
      .then(res => this.setState({cards: res.data, cardPageIndex: num, prevCardPageIndex: num, totalPages: parseInt(res.headers['total-pages'])}))
  }

  componentDidMount() {
    this.getCardPage(this.state.cardPageIndex)
  }

  componentDidUpdate() {
    if (this.state.cardPageIndex > this.state.prevCardPageIndex) {
      this.getCardPage(this.state.cardPageIndex)
    }
    console.log(this.state.cardPageIndex, this.state.prevCardPageIndex)
  }

  render() {
    if (!this.state.cards[1]) return <h1>Loading...</h1>
    return (
      <div className="columns">
        <div className={`column ${!this.state.deckPanelOpen ? 'is-11' : 'is-8'}`}>
          <div className="section">
            <FilterBar />
            <PaginationBar
              cardPageIndex={this.state.cardPageIndex}
              totalPages={this.state.totalPages}
              changePage={this.changePage}
            />
            <CardColumns
              cards={this.state.cards}
              addCardToDeck={this.addCardToDeck}
            />
            <PaginationBar
              cardPageIndex={this.state.cardPageIndex}
              totalPages={this.state.totalPages}
              changePage={this.changePage}
            />
          </div>
        </div>
        <div className={`column ${!this.state.deckPanelOpen ? 'is-1' : 'is-4'}`}>
          {this.state.deckPanelOpen ? <DeckPanel
            deckCards={this.state.deckCards}
            storeDeckName={this.storeDeckName}
            saveDeck={this.saveDeck}
          /> : ''}
        </div>
      </div>
    )
  }

}

export default CardsIndex
