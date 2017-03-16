import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import { Link } from 'react-router'

export default class TabPageBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.onClickTab = this.onClickTab.bind(this)
  }

  handleChange = (value) => {
    console.log('changing value: ', value)
    this.setState({
      value: value
    })
  }

  onClickTab (item) {
    console.log('value: ', this.state.value)
    console.log(item)
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
              label={item.title}
              onActive={this.onClickTab.bind(this, item)}
            >
              <div><Link to={item.path}/></div>
            </Tab>
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
