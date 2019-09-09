import React from 'react'

const PaginationBar = ({ pageIndex, totalPages, changePage }) => {
  return (
    <div>
      <hr />
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <a
          className="pagination-previous"
          onClick={() => changePage(pageIndex-1, totalPages)}
        >&lsaquo;</a>
        <a
          className="pagination-next"
          onClick={() => changePage(pageIndex+1, totalPages)}
        >&rsaquo;</a>
        <ul className="pagination-list">
          <li><a
            className="pagination-link" aria-label="Goto page 1"
            onClick={() => changePage(0, totalPages)}
          >1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link is-current" aria-label={`Goto page ${pageIndex+1}`} aria-current="page">{pageIndex+1}</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a
            className="pagination-link" aria-label={`Goto page ${totalPages+1}`}
            onClick={() => changePage(totalPages, totalPages)}
          >{totalPages ? totalPages+1 : '  '}</a></li>
        </ul>
      </nav>
      <hr />
    </div>
  )
}

export default PaginationBar
