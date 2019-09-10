import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Navbar from './components/common/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DeckNew from './components/card-index/DeckNew'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/decks/new" component={DeckNew}/>
          <Route path="/decks/edit/:id" component={DeckNew}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
