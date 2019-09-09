import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Navbar from './components/common/NavBar'
import DeckNew from './components/card-index/DeckNew'
import DeckEdit from './components/card-index/DeckEdit'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/decks/new" component={DeckNew}/>
          <Route path="/decks/edit/:id" component={DeckEdit}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
