import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TopDecks from './TopDecks'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      topDecks: []
    }
  }

  componentDidMount() {
    axios.get('api/decks/')
      .then(res => {
        const topDecks = res.data.sort((aDeck, bDeck) => bDeck.win_rate - aDeck.win_rate).slice(0, 4)
        this.setState({ topDecks })
      })
  }

  render() {
    if (!this.state.topDecks[0]) return <h1>Loading ...</h1>
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Mana Curve<i className="ms ms-guild-simic has-text-weight-medium"></i></h1>

              <h2 className="subtitle has-text-weight-medium">
                The Best Decks In Magic The Gathering
              </h2>
            </div>
          </div>
        </section>
        <hr />
        <div className="container">
          <h3 className="title is-2">Top Decks</h3>
          <TopDecks
            decks={this.state.topDecks}
          />
        </div>
        <hr />
        <div className="container">
          <div className="columns">
            <Link
              to="/decks/new"
              className="column has-text-centered"
            >
              <div className="box">
                <h4 className="title is-3">Build A Deck</h4>
              </div>
            </Link>
            <Link
              to="/decks/"
              className="column has-text-centered"
            >
              <div className="box">
                <h4 className="title is-3">View Top 20</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

}

export default Home
