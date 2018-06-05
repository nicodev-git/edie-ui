import React from 'react'
import {Button, Menu, MenuItem} from '@material-ui/core'

const tabs = [{
  title: 'Collectors',
  path: '/settings/collectors'
}, {
  title: 'Agents',
  path: '/settings/collectors/agents'
}]

export default class CollectorTabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewOpen: false,
      anchorEl: null
    }
  }

  handleRequestClose () {
    this.setState({
      viewOpen: false
    })
  }

  render () {
    const {history} = this.props
    return (
      <div className="inline-block">
        <Button variant="raised" color="primary" onClick={e => this.setState({viewOpen: true, anchorEl: e.target})}>View</Button>
        <Menu
          open={!!this.state.viewOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.handleRequestClose.bind(this)}>
          {tabs.map(p =>
            <MenuItem key={p.path} onClick={() => history.push(p.path)}>{p.title}</MenuItem>
          )}
        </Menu>
      </div>
    )
  }
}
