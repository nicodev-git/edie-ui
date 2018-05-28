import React from 'react'
import {Drawer, IconButton} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import DashboardIcon from '@material-ui/icons/Dashboard'
import DeviceIcon from '@material-ui/icons/Devices'
import PlaylistIcon from '@material-ui/icons/PlaylistAddCheck'
import Dashboard from './gaugeSubItem/Dashboard'
import Device from './gaugeSubItem/Device'
import Monitor from './gaugeSubItem/Monitor'
import {Modal} from 'components/modal/parts'

import {iconButtonStyle, sidebarWidth, sidebarStyle} from 'style/common/materialStyles'

const styles = {
  sidebar: sidebarStyle
}

class GaugePickerView extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedSubItem: 'dashboard',
    }
  }

  onClickSubItem (subItem) {
    this.setState({
      selectedSubItem: subItem,
    })
  }

  render () {
    const {onHide, gauges, classes} = this.props
    const {selectedSubItem} = this.state
    let subPage
    switch (selectedSubItem) {
      case 'monitor':
        subPage = (
          <Monitor {...this.props}/>
        )
        break
      case 'device':
        subPage = (
          <Device {...this.props}/>
        )
        break
      case 'dashboard':
      default:
        subPage = (
          <Dashboard
            gauges={gauges}
            onClickMenuItem={this.props.onClickMenuItem}
          />
        )
        break
    }
    return (
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 998 + sidebarWidth, maxWidth: 'initial'}}>
        <div style={{marginTop: 40, minHeight: 800}} className="flex-horizontal">
          <div style={{width: sidebarWidth}} className="hidden">
            <Drawer variant="permanent" classes={{paper: classes.sidebar}}>
              <div>
                <IconButton style={iconButtonStyle}><DashboardIcon nativeColor="#ffffff" onClick={this.onClickSubItem.bind(this, 'dashboard')}/></IconButton>
              </div>
              <div>
                <IconButton style={iconButtonStyle}><PlaylistIcon nativeColor="#ffffff" onClick={this.onClickSubItem.bind(this, 'monitor')}/></IconButton>
              </div>
              <div>
                <IconButton style={iconButtonStyle}><DeviceIcon nativeColor="#ffffff" onClick={this.onClickSubItem.bind(this, 'device')}/></IconButton>
              </div>
            </Drawer>
          </div>
          <div className="flex-1">
            {subPage}
          </div>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(GaugePickerView)
