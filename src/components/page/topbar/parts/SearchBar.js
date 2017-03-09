import React from 'react'

const SearchBar = ({onSearch}) => (
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

export default SearchBar
