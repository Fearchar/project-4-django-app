import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class DeckIndex extends React.Component {

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

  render() {
    return (
      <section className="section">
        <div className="columns is-multiline">
          {this.state.decks.map(deck =>
            <Link
              to={`/decks/edit/${deck.id}`}
              key={deck.id}
              className="column is-one-quarter"
            >
              <div className="box card-font"
              >
                <div>
                  <figure className="image">
                    <img
                      src={deck.imageUrl}
                      alt={deck.name}
                    />
                  </figure>
                  <br />
                  <p className="has-text-weight-bold">{deck.name}</p>
                  <p className="has-text-weight-bold">{`Created by: ${deck.created_by.username}`}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    )
  }
}

export default DeckIndex
