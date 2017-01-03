import React from 'react'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import MonitorTable from './MonitorTable'
import EventLogTable from './EventLogTable'
import ApplicationTableContainer from '../../../../../containers/page/content/device/monitors/ApplicationTableContainer'
import ProcessTable from './ProcessTable'
import MonitorLogTable from './MonitorLogTable'

import MonitorLogOptions from './MonitorLogOptions'

import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

class Monitors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'monitors',
      currentMonitor: null
    }
  }

  render2 () {
    const {device} = this.props
    return (
      <div className="flex-vertical flex-1">
        <div className="tab-header">
          <div>
              <span className="tab-title">{device.name || ''}</span>
          </div>
        </div>

        <div id="div-monitors" className="flex-vertical flex-1 margin-lg-top" />
      </div>
    )
  }

  renderOptions () {
    const {selected, currentMonitor} = this.state

    let toolbar = null

    switch (selected) {
      case 'monitorlog':
        toolbar = (
                   <MonitorLogOptions device={currentMonitor} father={this.props.device}/>
                )
        break
      default:
        toolbar = (
                    <div className="text-center margin-md-top">
                        <div style={{position: 'absolute'}}>
                            <div className="pull-left">
                                <a href="javascript:;"
                                  className={`btn btn-white text-primary ${selected === 'monitors' ? 'hidden' : ''}`}
                                  onClick={this.onClickShowMonitors.bind(this)}
                                >Show Monitors</a>
                            </div>
                        </div>

                        <div style={{position: 'absolute', right: '25px'}}>
                            <ButtonGroup>

                                <Button onClick={this.onClickAddMonitor.bind(this)} className={selected === 'monitors' ? '' : 'hidden'} >Add</Button>

                                <Button onClick={this.onClickEditMonitor.bind(this)} className={selected === 'monitors' ? '' : 'hidden'}>Edit</Button>

                                <Button onClick={this.onClickDeleteMonitor.bind(this)} className={selected === 'monitors' ? '' : 'hidden'}>Delete</Button>

                                <DropdownButton title="System" id="dd-dev-monitors" pullRight>

                                    <MenuItem eventKey="1" onClick={this.onClickEventLog.bind(this)}>
                                        <i className="fa fa-edit" />&nbsp;Event Log
                                    </MenuItem>

                                    <MenuItem eventKey="2" onClick={this.onClickApplication.bind(this)}>
                                        <i className="fa fa-edit" />&nbsp;Installed Applications
                                    </MenuItem>

                                    <MenuItem eventKey="3" onClick={this.onClickProcess.bind(this)}>
                                        <i className="fa fa-edit" />&nbsp;Process
                                    </MenuItem>

                                </DropdownButton>
                            </ButtonGroup>
                        </div>
                    </div>
                )
        break
    }

    return toolbar
  }

    // //////////////////////////////////////////////////////////////////////

  getMonitorTable () {
    return this.refs.monitor.getWrappedInstance()
  }

  onClickAddMonitor () {
    this.getMonitorTable().onClickAddMonitor()
  }

  onClickEditMonitor () {
    this.getMonitorTable().onClickEditMonitor()
  }

  onClickDeleteMonitor () {
    this.getMonitorTable().onClickDeleteMonitor()
  }

    // ///////////////////////////////////////////////////////////////////////

  onClickShowMonitors () {
    this.setState({
      'selected': 'monitors'
    })
  }
  onClickEventLog () {
    this.setState({
      'selected': 'eventlog'
    })
  }

  onClickApplication () {
    this.setState({
      'selected': 'application'
    })
  }

  onClickProcess () {
    this.setState({
      'selected': 'process'
    })
  }

  onMonitorLogClicked (monitor) {
    this.setState({
      'selected': 'monitorlog',
      'currentMonitor': monitor
    })
  }

  render () {
    const {props} = this
    const {device} = props

    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody>
          {
            this.state.selected !== 'monitors'
              ? null
              : <div className="flex-vertical" style={{height: '100%'}}>
                  <div className="flex-1" style={{background: 'white'}}>
                    <MonitorTable {...props} ref="monitor"/>
                  </div>
                </div>
          }

          {
            this.state.selected !== 'eventlog'
              ? null
              : <EventLogTable {...props}/>
          }

          {
            this.state.selected !== 'application'
              ? null
              : <ApplicationTableContainer {...props}/>
          }

          {
            this.state.selected !== 'process'
              ? null
              : <ProcessTable {...props}/>
          }

          {
            this.state.selected !== 'monitorlog'
              ? null
              : <MonitorLogTable device={this.state.currentMonitor} father={device}/>
          }
        </TabPageBody>
      </TabPage>
    )
  }
}

Monitors.defaultProps = {
}

function mapStateToProps (state) {
  return {device: state.dashboard.selectedDevice}
}

export default withRouter(connect(mapStateToProps)(Monitors))
