import React from 'react'
// import {Button, Menu, MenuItem} from '@material-ui/core'
// import SettingIcon from '@material-ui/icons/Settings'

import MainSettings from './MainSettings'
import Websocket from './websocket/Websocket'

// import SettingTabs from '../SettingTabs'
// import TabPage from 'components/common/TabPage'
// import TabPageBody from 'components/common/TabPageBody'
// import TabPageHeader from 'components/common/TabPageHeader'
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
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return this.renderContent(canEdit)
  }
}
