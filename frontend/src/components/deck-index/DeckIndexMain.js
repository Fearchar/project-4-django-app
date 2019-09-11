import React from 'react'
import axios from 'axios'

import DeckBox from './DeckBox'

class DeckIndexMain extends React.Component {

  constructor() {
    super()
    this.state = {
      decks: []
    }
  }

  componentDidMount() {
    axios.get('/api/decks/')
      .then(res => this.setState({ decks: res.data }))
  }

  sortByWinRate(decks) {
    const sortedDecks = [...decks]
    return sortedDecks.sort((aDeck, bDeck) => bDeck.win_rate - aDeck.win_rate)
  }

  render() {
    const decks = this.sortByWinRate(this.state.decks).slice(0, 20)
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Top 20 Decks
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {decks.map(deck =>
              <DeckBox
                key={deck.id}
                deck={deck}
              />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default DeckIndexMain
