import React from 'react'

const TopHeader = ({name}) => (
  <div className="navbar-brand-group">
    <a className="navbar-brand hidden-xxs" href="/">
      <span className="sc-visible"> I </span>
      <span className="sc-hidden">
        <span className="semi-bold">{name}</span>
      </span>
    </a>
  </div>
)

export default TopHeader
