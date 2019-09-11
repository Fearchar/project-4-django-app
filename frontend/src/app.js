import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import NavBar from './components/common/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DeckDetailMain from './components/deck-detail/DeckDetailMain'
import DeckIndexMain from './components/deck-index/DeckIndexMain'
import HomeMain from './components/home/HomeMain'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <NavBar />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/decks/new" component={DeckDetailMain}/>
          <Route path="/decks/:id(\d+)/edit" component={DeckDetailMain}/>
          <Route path="/decks/:id(\d+)" component={DeckDetailMain}/>
          <Route path="/decks" component={DeckIndexMain}/>
          <Route path="/" component={HomeMain}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
