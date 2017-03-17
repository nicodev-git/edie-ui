import React, { Component, PropTypes } from 'react'

export default class TabPageBody extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  getPage (url) {
    let urlArray = url.split('/')
    let path = urlArray[urlArray.length - 1]
    return path
  }

  navigate (item) {
    this.context.router.push(item.path)
  }

  render () {
    const tabs = this.props.tabs
    let pagePath = this.getPage(document.location.href)
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <ul className="nav nav-tabs tab-container">
          {tabs.map((item, i) =>
              <div
                key={i}
                onClick={this.navigate.bind(this, item)}
              >
                <div>
                  <div className="tab-label">{item.title}</div>
                  <div className={pagePath === this.getPage(item.path) ? 'tab-chosen' : 'tab-blank'}/>
                </div>
              </div>
          )}
        </ul>
        <div className="tab-content table-panel">
          {this.props.children}
        </div>
      </div>
    )
  }
}

TabPageBody.defaultProps = {
  tabs: []
}
