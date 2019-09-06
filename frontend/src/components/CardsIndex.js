import React from 'react'
import axios from 'axios'

class CardsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    axios.get('/api/cards/1')
      .then(res => this.setState({cards: res.data}))
  }

  render() {
    console.log(this.state)
    if (!this.state.cards[1]) return <h1>Loading...</h1>
    return (
      <div className="section">
        <div className="columns is-multiline">
          <div className="column is-one-third">
            <label>Filter by name</label>
            <input
              className="input"
              name="name"
              placeholder="Enter card name"
            />
          </div>
          <div className="column is-one-third">
            <label>Filter by text</label>
            <input
              className="input"
              name="text"
              placeholder="Enter card text"
            />
          </div>
          <div className="column is-one-third">
            <label>Filter by set</label>
            <input
              className="input"
              name="set"
              placeholder="Enter set name"
            />
          </div>
          <div className="column is-one-third">
            <label>Filter by card colour</label>
            <div className="columns is-mobile">
              <div className="column is-2">
                <button className="button is-rounded is-danger"></button>
              </div>
              <div className="column is-2">
                <button className="button is-rounded is-info"></button>
              </div>
              <div className="column is-2">
                <button className="button is-rounded is-primary"></button>
              </div>
              <div className="column is-2">
                <button className="button is-rounded is-dark"></button>
              </div>
              <div className="column is-2">
                <button className="button is-rounded"></button>
              </div>
              <div className="column is-2">
                <button className="button is-rounded is-light"></button>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <label>Filter by cmc</label>
            <input
              className="input"
              type="number"
              name="cmc"
              placeholder="Enter cmc"
            />
          </div>
          <div className="column is-one-third">
            <label>Filter by rarity</label>
            <input
              className="input"
              name="rarity"
              placeholder="Enter rarity"
            />
          </div>
          <button className="button is-small is-rounded is-link">Reset</button>
        </div>
        <hr />
        <div className="columns is-multiline">
          {this.state.cards.map(card =>
            <div
              key={card.id}
              className="box column is-one-quarter"
            >
              {!card.imageUrl ? <h3>{card.name}</h3> :
                <figure className="image">
                  <img src={card.imageUrl} alt={card.name} />
                </figure>}
            </div>
          )}
        </div>
      </div>
    )
  }

}

export default CardsIndex
