import React, { Component, PropTypes } from 'react'

export default class TabPageBody extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.checkPath = this.checkPath.bind(this)
  }

  checkPath (url, number) {
    let urlArray = url.split('/')
    let path = urlArray[urlArray.length - 1]
    let pageUrl = document.location.href
    let pageArray = pageUrl.split('/')
    let page = pageArray[pageArray.length - 1]
    if (path === page) {
      return true
    } else {
      let rootPath = urlArray[urlArray.length - 2]
      if ((rootPath === page) && (number === 0)) {
        return true
      }
    }
    return false
  }

  navigate (item) {
    this.context.router.push(item.path)
  }

  render () {
    const {tabs, tclass} = this.props
    let tableclass = tclass || ''

    let active = 0
    tabs.forEach((p, i) => {
      if (this.context.router.isActive(p.path)) active = i
    })

    return (
      <div className="tabs-custom flex-vertical flex-1">
        <div className={`nav nav-tabs tab-container ${tabs.length ? '' : 'mt-none'}`}>
          {tabs.map((item, i) =>
              <div
                key={i}
                onClick={this.navigate.bind(this, item)}
              >
                <div>
                  <div className="tab-label">{item.title}</div>
                  <div className={i === active ? 'tab-chosen' : 'tab-blank'}/>
                </div>
              </div>
          )}
        </div>
        <div className={`tab-content ${tableclass}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

TabPageBody.defaultProps = {
  tabs: []
}
