import React from 'react'
import {Drawer, IconButton} from 'material-ui'

import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import DeviceIcon from 'material-ui/svg-icons/device/devices'
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-add-check'
import Dashboard from './gaugeSubItem/Dashboard'
import Device from './gaugeSubItem/Device'
import Monitor from './gaugeSubItem/Monitor'
import { Modal } from 'components/modal/parts'

import {sidebarWidth, sidebarStyle} from 'style/common/materialStyles'

export default class GaugePickerView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedSubItem: 'dashboard',
    };
  }
  onClickSubItem(subItem) {
    this.setState({
      selectedSubItem: subItem,
    });
  }
  

  render () {
    const {onHide, gauges} = this.props;
    const { selectedSubItem } = this.state;
    let subPage;
    switch (selectedSubItem) {
      case 'dashboard': 
        subPage = (
          <Dashboard
            gauges={gauges}
            onClickMenuItem={this.props.onClickMenuItem}
          />
        );
        break;
      case 'monitor':
      subPage = (
        <Monitor
          gauges={gauges}
          devices={this.props.devices}
        />
      );
        break;
      case 'device':
      subPage = (
        <Device
          gauges={gauges}          
          devices={this.props.devices}
        />
      );
        break;
     default:
        subPage = (
          <Dashboard
            gauges={gauges}
            onClickMenuItem={this.props.onClickMenuItem}
          />
        );
        break;
    }
    return (
      <Modal title="Gauge" onRequestClose={onHide} contentStyle={{width: 1058 + sidebarWidth, maxWidth: 'initial'}}>
        <div style={{marginTop: 40, minHeight: 500}} className="flex-horizontal">
          <div style={{width: sidebarWidth}}>
            <Drawer open width={sidebarWidth} containerStyle={{...sidebarStyle, left: 'initial', bottom: 0, top: 56, height: 'initial'}}>
              <div>
                <IconButton><DashboardIcon color="#ffffff" onClick={this.onClickSubItem.bind(this, 'dashboard')}/></IconButton>
              </div>
              <div>
                <IconButton><PlaylistIcon color="#ffffff" onClick={this.onClickSubItem.bind(this, 'monitor')}/></IconButton>
              </div>
              <div>
                <IconButton><DeviceIcon color="#ffffff" onClick={this.onClickSubItem.bind(this, 'device')}/></IconButton>
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
