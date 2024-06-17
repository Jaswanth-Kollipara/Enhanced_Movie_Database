import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const searchIcon = <BsSearch className="header-search-icon" />

const Header = () => (
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
            Top Ratedr
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
        placeholder="search"
      />
      <button type="button" className="header-search-button">
        {searchIcon}
      </button>
    </div>
  </nav>
)

export default Header
