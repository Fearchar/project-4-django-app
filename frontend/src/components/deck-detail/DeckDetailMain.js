import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import DeckPanel from './DeckPanel'
import FilterBar from './FilterBar'
import PaginationBar from './PaginationBar'
import CardColumns from './CardColumns'

class DeckDetailMain extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'new',
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
      deck: {
        id: null,
        saveMessage: '',
        name: '',
        win_rate: 0,
        cards: []
      }
    }

    this.changePage = this.changePage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.storeCardFilters = this.storeCardFilters.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
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

  handleChange(e) {
    const deck = { ...this.state.deck, [e.target.name]: e.target.value }
    if (deck.win_rate > 100) deck.win_rate = 100
    if (deck.win_rate < 0) deck.win_rate = 0
    this.setState({ deck })
  }

  storeCardFilters(e) {
    let value = e.target.value
    if (isNaN(+value)) value = value.toLowerCase()
    else if (value) value = +value
    const cardFilters = { ...this.state.cardFilters, [e.target.name]: value }
    this.setState({ cardFilters, pageIndex: 0 })
  }

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
    cards.sort((aCard, bCard) => aCard.cmc - bCard.cmc)
    return cards
  }

  resetFilters() {
    const cardFilters = {
      name: '',
      text: '',
      set: '',
      manaCost: '',
      cmc: '',
      rarity: ''
    }
    this.setState({ cardFilters })
  }

  addCardToDeck(card) {
    const deckCards = [...this.state.deck.cards, card]
    deckCards.sort((aCard, bCard) => aCard.cmc - bCard.cmc)
    const deck = { ...this.state.deck, cards: deckCards }
    this.setState({ deck })
  }

  removeCardFromDeck(card) {
    const cardIndex = this.state.deck.cards.findIndex(item => item.id === card.id)
    const deckCards = this.state.deck.cards
    deckCards.splice(cardIndex, 1)
    const deck = { ...this.state.deck, cards: deckCards}
    this.setState({ deck })
  }

  saveDeck() {
    const deck = this.state.deck
    deck.cards.sort((aCard, bCard) => aCard.cmc - bCard.cmc)
    const cardIds = deck.cards.map(card => card.id)
    const deckData = {
      name: deck.name,
      win_rate: deck.win_rate,
      cards: cardIds,
      imageUrl: deck.cards[deck.cards.length - 1].imageUrl
    }
    if (this.state.mode === 'new') {
      axios.post('/api/decks/', deckData, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
          const deck = res.data
          this.props.history.push(`/decks/edit/${deck.id}`)
        })

    } else if (this.state.mode === 'edit') {
      axios.put(`/api/decks/${this.props.match.params.id}`, deckData, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
          this.setState({ deck: res.data })
        })
    }
    // !!! .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  //
  // deleteDeck() {
  //
  // }

  getCards() {
    axios.get('/api/cards/')
      // !!! Could result in a 404 page if they have errors. Even if it's just a h tag.
      .then(res => this.setState({cards: res.data}))
  }

  startPage() {
    this.getCards()
    const mode = this.props.match.path.includes('edit') ? 'edit' : 'new'
    if (mode === 'edit') {
      axios.get(`/api/decks/${this.props.match.params.id}`)
        .then(res => this.setState({ deck: res.data }))
    } else {
      const deck = {
        name: '',
        cards: []
      }
      this.setState({ deck })
    }
    this.setState({ mode })
  }

  componentDidMount() {
    this.startPage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.startPage()
    }
  }


  render() {
    console.log('state:', this.state)
    const cards = this.filterCards(cards)
    const totalPages = Math.floor((cards.length - 1) / this.state.pageSize)
    return (
      <div className="columns">
        <div className="column is-8">
          <div className="section">
            <FilterBar
              cardFilters={this.state.cardFilters}
              storeCardFilters={this.storeCardFilters}
              resetFilters={this.resetFilters}
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
        <div className="column is-4">
          <DeckPanel
            deck={this.state.deck}
            handleChange={this.handleChange}
            removeCardFromDeck={this.removeCardFromDeck}
            saveDeck={this.saveDeck}
          />
        </div>
      </div>
    )
  }
}

export default DeckDetailMain
