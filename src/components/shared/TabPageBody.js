import React, { Component, PropTypes } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

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

  navigate (index) {
    const {tabs} = this.props
    this.context.router.push(tabs[index].path)
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
        <Tabs value={active} onChange={this.navigate.bind(this)}>
          {tabs.map((item, i) =>
            <Tab key={i} label={item.title} value={i}/>
          )}
        </Tabs>

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
