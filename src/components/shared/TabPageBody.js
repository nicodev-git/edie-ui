import React, { Component, PropTypes } from 'react'

export default class TabPageBody extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.getPath = this.getPath.bind(this)
  }

  getPath () {
    let url = document.location.href
    let urlArray = url.split('/')
    let path = ''
    for (let i = 1; i < urlArray.length; i++) {
      path += urlArray[i]
    }
    console.log(path)
    return path
  }

  navigate (item) {
    this.context.router.push(item.path)
  }

  render () {
    const tabs = this.props.tabs
    let pagePath = this.getPath()
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <ul className="nav nav-tabs">
          {tabs.map((item, i) =>
              <div
                key={i}
                onClick={this.navigate.bind(this, item)}
                className={pagePath === item.path ? 'tab-chosen' : ''}>
                {item.title}
              </div>
          )}
        </ul>
        <div className="tab-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

TabPageBody.defaultProps = {
  tabs: []
}
