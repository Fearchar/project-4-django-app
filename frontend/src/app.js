import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma'

import CardsIndex from './components/CardsIndex'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/cards" component={CardsIndex}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
