import React from 'react'

const FilterBar = ({ storeCardFilters }) => {
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
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by text</label>
          <input
            className="input is-small"
            name="text"
            placeholder="Enter card text"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by set</label>
          <input
            className="input is-small"
            name="set"
            placeholder="Enter set name"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by card colour</label>
          <div className="columns is-mobile">
            <div className="column is-2">
              <button
                className="button is-small is-rounded is-danger"
                name="manaCost"
                value="R"
                onClick={storeCardFilters}
              ></button>
            </div>
            <div className="column is-2">
              <button
                className="button is-small is-rounded is-info"
                name="manaCost"
                value="U"
                onClick={storeCardFilters}
              ></button>
            </div>
            <div className="column is-2">
              <button
                className="button is-small is-rounded is-primary"
                name="manaCost"
                value="G"
                onClick={storeCardFilters}
              ></button>
            </div>
            <div className="column is-2">
              <button
                className="button is-small is-rounded is-dark"
                name="manaCost"
                value="B"
                onClick={storeCardFilters}
              ></button>
            </div>
            <div className="column is-2">
              <button
                className="button is-small is-rounded"
                name="manaCost"
                value="W"
                onClick={storeCardFilters}
              ></button>
            </div>
            <div className="column is-2">
              <button
                className="button is-small is-rounded is-light"
                name="manaCost"
                value="none"
                onClick={storeCardFilters}
              ></button>
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
            min="0"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by rarity</label>
          <input
            className="input is-small"
            name="rarity"
            placeholder="Enter rarity"
            onChange={storeCardFilters}
          />
        </div>
        <button className="button is-small is-rounded is-link">Reset</button>
      </div>
    </div>
  )
}

export default FilterBar
