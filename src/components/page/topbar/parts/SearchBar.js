import React from 'react'
import Chip from 'material-ui/Chip'
import SearchIcon from 'material-ui/svg-icons/action/search'

const searchStyle = {
  width: 250,
  borderRadius: 10,
  alignItems: 'center'
}

const SearchBar = ({onSearch}) => (
  <div className="searchbar-container">
    <Chip style={searchStyle}>
      <SearchIcon color="#ffffff"/>
    </Chip>
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
