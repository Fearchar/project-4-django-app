import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

const DeckLink = ({ className, children, deck }) => {
  return(
    <Link
      className={className}
      to={Auth.getCurrentUserId() === deck.created_by.id ?
        `/decks/${deck.id}/edit` :
        `/decks/${deck.id}`
      }
    >
      {children}
    </Link>
  )
}

export default DeckLink
