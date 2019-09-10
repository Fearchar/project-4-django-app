import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Navbar from './components/common/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DeckIndex from './components/deck/DeckIndex'
import DeckDetail from './components/deck/DeckDetail'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/decks/edit/:id" component={DeckDetail}/>
          <Route path="/decks/new" component={DeckDetail}/>
          <Route path="/decks" component={DeckIndex}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
