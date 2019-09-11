import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bulma'
import './style.scss'

import NavBar from './components/common/NavBar'
import SecureRoute from './components/common/SecureRoute'
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
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
        />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <SecureRoute path="/decks/new" component={DeckDetailMain}/>
          <SecureRoute path="/decks/:id(\d+)/edit" component={DeckDetailMain}/>
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
