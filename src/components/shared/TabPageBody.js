import React, { Component, PropTypes } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

export default class TabPageBody extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
    this.onClickTab = this.onClickTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  componentWillMount () {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillReceiveProps (nextProps) {
    let url = document.location.href
    let urlArray = url.split('/')
    let target = urlArray[urlArray.length - 1]
    console.log('receive props')
    console.log(target)
    console.log(nextProps.tabs)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick, false)
  }

  onClickTab (item) {

  }

  handleClick (e) {
    let path = e.path
    for (let i = 0; i < path.length; i++) {
      let name = path[i].className
      let number = (+name)
      if ((number > 0) && (number < 100)) {
        let tabs = this.props.tabs
        if (number <= tabs.length) {
          this.navigate(tabs[number - 1], (number - 1))
        }
      }
    }
  }

  navigate (item, number) {
    this.context.router.push(item.path)
    // let elem = document.getElementById('tabs')
    // elem.value = number
    console.log('number in navigate: ', number)
    console.log('value in navigate: ', this.state.value)
  }

  render () {
    const tabs = this.props.tabs

    return (
      <div className="tabs-custom flex-vertical flex-1">
        <Tabs value={this.state.value} id="tabs" className="nav nav-tabs">
          {tabs.map((item, i) =>
              <Tab
                key={i}
                value={i}
                className={(i + 1).toString()}
                label={item.title}
                onActive={this.onClickTab.bind(this, item)}
              />
          )}
        </Tabs>
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
