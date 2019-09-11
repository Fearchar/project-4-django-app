import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      navbarOpen: false
    }
    this.logout = this.logout.bind(this)
  //   this.toggleNavbar = this.toggleNavbar.bind(this)
  }
  //
  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }
  //
  // toggleNavbar() {
  //   this.setState({ navbarOpen: !this.state.navbarOpen})
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if(prevProps.location.pathname !== this.props.location.pathname) {
  //     this.setState({ navbarOpen: false})
  //   }
  // }

  // <h1 className="title">Happening</h1>
  render() {
    return (
      <nav className="navbar is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={'navbar-menu'}
        >
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              <div className="navbar-brand">
                <div className="navbar-item title is-1">M<i className="ms ms-guild-simic has-text-weight-medium"></i></div>
              </div>
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">

            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!Auth.isAuthenticated() ?
                  <div>
                    <Link to="/register" className="button is-info">
                      <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-info">
                      <strong>Login</strong>
                    </Link>
                  </div> :
                  <button
                    className="button is-info"
                    onClick={this.logout}
                  >Logout</button>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
