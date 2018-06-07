import React from 'react'
import {Button, Menu, MenuItem} from '@material-ui/core'
import SettingIcon from '@material-ui/icons/Settings'

import MainSettings from './MainSettings'
import Websocket from './websocket/Websocket'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import {showAlert} from 'components/common/Alert'
import {hasPermission} from 'shared/Permission'

export default class Advanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageIndex: 0,
      routeOpen: false,
      open: false
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const {syncStatus} = this.props
    if (nextProps.syncStatus && syncStatus !== nextProps.syncStatus) {
      if (nextProps.syncStatus === 'OK') showAlert('Sync completed successfully!')
      else showAlert('Sync failed!')
    }
  }

  renderContent (canEdit) {
    switch (this.state.pageIndex) {
      case 1:
        return <Websocket />
      default:
        return <MainSettings {...this.props} canEdit={canEdit}/>
    }
  }

  onClickTab (pageIndex) {
    this.setState({ pageIndex })
  }

  onClickAddRouting () {

  }

  onClickEditRouting () {

  }

  handleTouchTap (event) {
    this.setState({
      open: true,
      anchorEl: event.target
    })
  }

  handleRequestClose () {
    this.setState({
      open: false,
      routeOpen: false
    })
  }

  onClickRouting (event) {
    this.setState({
      routeOpen: true,
      anchorEl: event.target
    })
  }
  render () {
    const {pageIndex} = this.state
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              {pageIndex === 2 && <Button variant="raised" onClick={this.onClickRouting.bind(this)}>Routing</Button>}&nbsp;
              <Menu
                open={this.state.routeOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onClose={this.handleRequestClose.bind(this)}>
                <MenuItem onClick={this.onClickAddRouting.bind(this)}>Add</MenuItem>
                <MenuItem onClick={this.onClickEditRouting.bind(this)}>Edit</MenuItem>
              </Menu>
              <Button variant="raised" onClick={this.handleTouchTap.bind(this)} className="hidden"><SettingIcon /></Button>
              <Menu
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onClose={this.handleRequestClose.bind(this)}>
                <MenuItem onClick={this.onClickTab.bind(this, 0)}>Main</MenuItem>
                <MenuItem onClick={this.onClickTab.bind(this, 1)}>Websocket</MenuItem>
                <MenuItem onClick={this.onClickTab.bind(this, 2)}>Routing</MenuItem>
              </Menu>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={7} history={this.props.history} location={this.props.location}>
          {this.renderContent(canEdit)}
        </TabPageBody>
      </TabPage>
    )
  }
}
