import React from 'react'
import { Link } from 'react-router'

class TabPageBody extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onClickTab () {

  }

  render () {
    const {tab, tabs} = this.props

    return (
      <div className="tabs-custom flex-vertical flex-1">
        <ul className="nav nav-tabs">
          {tabs.map((item, i) =>
            <li key={i} className={tab === i ? 'active' : ''}>
              <Link to={{ pathname: item.path }}
                onClick={this.onClickTab.bind(this)}>{item.title}</Link>
            </li>
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
  tabs: [],
  tab: -1
}

export default TabPageBody
