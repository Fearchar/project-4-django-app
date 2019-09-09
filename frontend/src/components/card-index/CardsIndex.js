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
      pageSize: 8,
      pageIndex: 0,
      cardFilters: {
        name: '',
        text: '',
        set: '',
        manaCost: '',
        cmc: '',
        rarity: ''
      },
      deckPanelOpen: true,
      deckCards: [],
      deckName: null
    }

    this.changePage = this.changePage.bind(this)
    this.storeDeckName = this.storeDeckName.bind(this)
    this.storeCardFilters = this.storeCardFilters.bind(this)
    //!!! this.changePage = this.changePage.bind(this)
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.removeCardFromDeck = this.removeCardFromDeck.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
  }

  changePage(pageIndex, totalPages) {
    if (
      pageIndex > totalPages ||
      pageIndex < 0
    ) return null
    this.setState({ pageIndex })
  }

  // !!! Turn the two below in to one function and change name to storeChange
  storeDeckName(e) {
    this.setState({ deckName: e.target.value })
  }

  storeCardFilters(e) {
    let value = e.target.value
    if (isNaN(+value)) value = value.toLowerCase()
    else if (value) value = +value
    const cardFilters = { ...this.state.cardFilters, [e.target.name]: value }
    this.setState({ cardFilters })
  }

  // !!! Use lodash intersection to make this more efficient and to fix cmc behaviour
  // !! make rarity a drop down and make it have to exactly equal result
  filterCards() {
    let cards = this.state.cards
    const cardFilters = this.state.cardFilters
    for (const key in cardFilters) {
      if (cardFilters[key] !== '') cards = cards.filter(card => {
        const filterValue = cardFilters[key]
        const cardValue = card[key]
        if (key === 'manaCost' && filterValue === 'none') {
          return !/[WUBRG]/.test(cardValue)
        } else if (typeof filterValue === 'string') return cardValue.toLowerCase().includes(filterValue)
        return cardValue === filterValue

      })
    }
    return cards.sort((aCard, bCard) => aCard.cmc - bCard.cmc)
  }

  addCardToDeck(card) {
    const deckCards = [...this.state.deckCards, card]
    // !!! Change to sort by manaCost
    deckCards.sort((a, b) => {
      if (a.name < b.name) return -1
      if (b.name < a.name) return 1
    })
    this.setState({ deckCards })
  }

  removeCardFromDeck(card) {
    const cardIndex = this.state.deckCards.findIndex(item => item.id === card.id)
    const deckCards = this.state.deckCards
    deckCards.splice(cardIndex, 1)
    this.setState({ deckCards })
  }

  saveDeck() {
    const cardIds = this.state.deckCards.map(card => card.id)
    const deckRequest = {
      name: this.state.deckName,
      // !!! Need to change this to pk here and on the backend, once you have auth up and running
      created_by_pk: 'admin',
      win_rate: null,
      card_pks: cardIds
    }
    axios.post('/api/decks/', deckRequest)
      // !!! I need to do something with this response to tell the user the save was successful
      .then(res => console.log(res.data))
      // !!! .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  getCardPage() {
    axios.get('/api/cards/')
      // !!! Could result in a 404 page if they have errors. Even if it's just a h tag.
      .then(res => this.setState({cards: res.data}))
  }

  componentDidMount() {
    this.getCardPage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ cards: null })
      this.getCardPage(this.props.match.params.page)
    }
  }

  render() {
    console.log('state:', this.state)
    const cards = this.filterCards(cards)
    const totalPages = Math.floor((cards.length - 1) / this.state.pageSize)
    // !!! Get rid of difference column sizes if you don't make deck panel pull out
    return (
      <div className="columns">
        <div className={`column ${!this.state.deckPanelOpen ? 'is-11' : 'is-8'}`}>
          <div className="section">
            <FilterBar
              storeCardFilters={this.storeCardFilters}
            />
            <PaginationBar
              pageIndex={this.state.pageIndex}
              totalPages={totalPages}
              changePage={this.changePage}
            />
            <CardColumns
              cards={cards}
              pageIndex={this.state.pageIndex}
              pageSize={this.state.pageSize}
              addCardToDeck={this.addCardToDeck}
            />
            <PaginationBar
              pageIndex={this.state.pageIndex}
              totalPages={totalPages}
              changePage={this.changePage}
            />
          </div>
        </div>
        <div className={`column ${!this.state.deckPanelOpen ? 'is-1' : 'is-4'}`}>
          {this.state.deckPanelOpen ? <DeckPanel
            deckCards={this.state.deckCards}
            storeDeckName={this.storeDeckName}
            removeCardFromDeck={this.removeCardFromDeck}
            saveDeck={this.saveDeck}
          /> : ''}
        </div>
      </div>
    )
  }

}

export default CardsIndex
