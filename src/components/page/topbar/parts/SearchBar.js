import React from 'react'
import SearchIcon from 'material-ui/svg-icons/action/search'

const searchStyle = {
  backgroundColor: '#d1d1d1'
}

const iconStyle = {
  lineHeight: 50,
  verticalAlign: 'middle'
}

const SearchBar = ({onSearch, color}) => (
  <div className="searchbar-container">
    <div className="searchbar" style={searchStyle}>
      <SearchIcon color={color} style={iconStyle}/>
    </div>
  </div>
)

export default SearchBar

/* const SearchBar = ({onSearch}) => (
  <ul className="nav navbar-nav navbar-nav-expanded pull-left">
    <li className="hidden-xs" style={{ marginTop: '4px' }}>
      <div className="navbar-form">
        <div className="navbar-search">
          <a onClick={onSearch}>
            <i className="fa fa-search" />
          </a>
        </div>
      </div>
    </li>
  </ul>
)

export default SearchBar */
