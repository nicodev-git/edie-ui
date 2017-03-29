import React from 'react'
import SearchIcon from 'material-ui/svg-icons/action/search'

const defaultStyle = {
  backgroundColor: '#d1d1d1'
}

const activeStyle = {
  backgroundColor: '#eaeaea'
}

const iconStyle = {
  lineHeight: 50,
  verticalAlign: 'middle'
}

const SearchBar = ({onSearch, active, onFocus, onBlur, defaultKeyword, autoFocus}) => (
  <div className="searchbar-container">
    <div className="searchbar" style={active ? activeStyle : defaultStyle}>
      <SearchIcon color={active ? '#000000' : '#ffffff'} style={iconStyle}/>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        id="searchInput"
        className="searchbar-input"
        style={active ? activeStyle : defaultStyle}
        autoFocus={autoFocus}
        defaultValue={defaultKeyword}
        onKeyPress={onSearch}/>
    </div>
  </div>
)

export default SearchBar
