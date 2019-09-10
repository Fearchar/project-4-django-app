import React from 'react'

const FilterBar = ({ cardFilters, storeCardFilters, resetFilters }) => {
  return (
    <div>
      <br />
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <label>Filter by name</label>
          <input
            className="input is-small"
            name="name"
            value={cardFilters.name}
            placeholder="Enter card name"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by text</label>
          <input
            className="input is-small"
            name="text"
            value={cardFilters.text}
            placeholder="Enter card text"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by set</label>
          <input
            className="input is-small"
            name="set"
            value={cardFilters.set}
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
            value={cardFilters.cmc}
            placeholder="Enter cmc"
            min="0"
            onChange={storeCardFilters}
          />
        </div>
        <div className="column is-one-third">
          <label>Filter by type</label>
          <input
            className="input is-small"
            name="type"
            placeholder="Enter type"
            onChange={storeCardFilters}
          />
        </div>
        <div className="has-text-centered">
          <button
            className="button is-small is-rounded is-link"
            onClick={resetFilters}
          >Reset</button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
