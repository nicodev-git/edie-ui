import React from 'react'
import {Button, Popover, Menu, MenuItem} from 'material-ui'

const tabs = [{
  title: 'Tags',
  path: '/settings/tags'
}, {
  title: 'Templates',
  path: '/settings/tags/templates'
}, {
  title: 'Workflows',
  path: '/settings/tags/rules'
}, {
  title: 'ParserTypes',
  path: '/settings/tags/parsertypes'
}]

export default class WorkflowTabs extends React.Component {
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
        <Button variant="raised" color="primary" onClick={e => this.setState({viewOpen: true, anchorEl: e.currentTarget})}>View</Button>
        <Popover
          open={!!this.state.viewOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <Menu>
            {tabs.map(p =>
              <MenuItem key={p.path} primaryText={p.title} onClick={() => history.push(p.path)}/>
            )}
          </Menu>
        </Popover>
      </div>
    )
  }
}
