import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Navbar from './components/common/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DeckDetailMain from './components/deck/DeckDetailMain'
import DeckIndexMain from './components/deck-index/DeckIndexMain'
import Home from './components/home/Home'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/decks/edit/:id" component={DeckDetailMain}/>
          <Route path="/decks/new" component={DeckDetailMain}/>
          <Route path="/decks" component={DeckIndexMain}/>
          <Route path="/" component={Home}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
