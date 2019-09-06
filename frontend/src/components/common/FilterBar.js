import React from 'react'

const FilterBar = () => {
  return (
    <div>
      <br />
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <label>Filter by name</label>
          <input
            className="input is-small"
            name="name"
            placeholder="Enter card name"
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by text</label>
          <input
            className="input is-small"
            name="text"
            placeholder="Enter card text"
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by set</label>
          <input
            className="input is-small"
            name="set"
            placeholder="Enter set name"
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by card colour</label>
          <div className="columns is-mobile">
            <div className="column is-2">
              <button className="button is-small is-rounded is-danger"></button>
            </div>
            <div className="column is-2">
              <button className="button is-small is-rounded is-info"></button>
            </div>
            <div className="column is-2">
              <button className="button is-small is-rounded is-primary"></button>
            </div>
            <div className="column is-2">
              <button className="button is-small is-rounded is-dark"></button>
            </div>
            <div className="column is-2">
              <button className="button is-small is-rounded"></button>
            </div>
            <div className="column is-2">
              <button className="button is-small is-rounded is-light"></button>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <label>Filter by cmc</label>
          <input
            className="input is-small"
            type="number"
            name="cmc"
            placeholder="Enter cmc"
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by rarity</label>
          <input
            className="input is-small"
            name="rarity"
            placeholder="Enter rarity"
          />
        </div>
        <button className="button is-small is-rounded is-link">Reset</button>
      </div>
      <hr />
    </div>
  )
}

export default FilterBar
