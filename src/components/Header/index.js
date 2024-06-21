import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {text: ''}

  onChangeText = event => {
    this.setState({text: event.target.value})
  }

  render() {
    const {text} = this.state
    return (
      <nav className="header-nav">
        <h1 className="header-titile">movieDB</h1>
        <ul className="header-ul">
          <li className="header-li">
            <Link to="/" className="header-nav-link">
              <button className="header-link-buttton" type="button">
                Popular
              </button>
            </Link>
          </li>
          <li className="header-li">
            <Link to="/top-rated" className="header-nav-link">
              <button className="header-link-buttton" type="button">
                Top Rated
              </button>
            </Link>
          </li>
          <li className="header-li">
            <Link to="/upcoming" className="header-nav-link">
              <button className="header-link-buttton" type="button">
                Upcoming
              </button>
            </Link>
          </li>
        </ul>
        <div className="header-search-container">
          <input
            type="search"
            className="header-search-input"
            placeholder="Enter Movie Name"
            value={text}
            onChange={this.onChangeText}
          />
          <Link to={`/search/${text}`}>
            <button type="button" className="header-search-button">
              Search
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
