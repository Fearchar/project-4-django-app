import React from 'react'

const PaginationBar = ({ cardPageIndex, totalPages, changePage }) => {
  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a
        className="pagination-previous"
        onClick={() => changePage(cardPageIndex-1)}
      >&lsaquo;</a>
      <a
        className="pagination-next"
        onClick={() => changePage(cardPageIndex+1)}
      >&rsaquo;</a>
      <ul className="pagination-list">
        <li><a
          className="pagination-link" aria-label="Goto page 1"
          onClick={() => changePage(0)}
        >1</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a className="pagination-link is-current" aria-label={`Goto page ${cardPageIndex+1}`} aria-current="page">{cardPageIndex+1}</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a
          className="pagination-link" aria-label={`Goto page ${totalPages+1}`}
          onClick={() => changePage(totalPages)}
        >{totalPages ? totalPages+1 : '  '}</a></li>
      </ul>
    </nav>
  )
}

export default PaginationBar
