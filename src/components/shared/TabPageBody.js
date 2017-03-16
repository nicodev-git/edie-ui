import React, { Component, PropTypes } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import MonkeyPatchLink from './MonkeyPatchLink'

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
                containerElement={<MonkeyPatchLink to={item.path}/>}
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
