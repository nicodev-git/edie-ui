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
    this.handleChange = this.handleChange.bind(this)
    this.onClickTab = this.onClickTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount () {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleChange = (value) => {
    console.log('changing value: ', value)
    let tabs = this.props.tabs
    let path = tabs[value].path
    this.context.router.push(path)
    this.setState({
      value: value
    })
  }

  onClickTab (item) {
    console.log('value: ', this.state.value)
    console.log(item)
  }

  handleClick (e) {
    console.log('click')
    let path = e.path
    for (let i = 0; i < path.length; i++) {
      console.log(path[i])
    }
  }

  render () {
    const tabs = this.props.tabs

    return (
      <div className="tabs-custom flex-vertical flex-1">
        <Tabs value={this.state.value} onChange={this.handleChange} className="nav nav-tabs">
          {tabs.map((item, i) =>
              <Tab
                key={i}
                value={i}
                className={i.toString()}
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
