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
    let path = urlArray[urlArray.length - 1]
    console.log(path)
    return path
  }

  navigate (item) {
    this.context.router.push(item.path)
  }

  render () {
    const tabs = this.props.tabs
    let pagePath = this.getPath()
    console.log(pagePath)
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <ul className="nav nav-tabs tab-container">
          {tabs.map((item, i) =>
              <div
                key={i}
                onClick={this.navigate.bind(this, item)}
              >
                <div>{item.title}</div>
                <div className={pagePath === item.title.toLowerCase() ? 'tab-chosen' : 'tab-blank'}/>
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
