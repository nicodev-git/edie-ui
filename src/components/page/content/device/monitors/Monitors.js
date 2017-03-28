import React from 'react'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'

import MonitorTable from './MonitorTable'
import EventLogTable from './EventLogTable'
import ApplicationTable from './ApplicationTable'
import ProcessTable from './ProcessTable'
import ProcessModal from './ProcessModal'
import MonitorLogTable from './MonitorLogTable'

import MonitorLogOptions from './MonitorLogOptions'

import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { store } from 'shared/GetStore'

export default class Monitors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'monitors',
      currentMonitor: null
    }
  }

  getMonitorTable () {
    return this.refs.monitor
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
                  onClick={this.onClickShowMonitors.bind(this)}>Show Monitors</a>
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

  renderBody () {
    const {props} = this
    const {device} = props

    switch (this.state.selected) {
      case 'monitors' :
        return (
          <div className="flex-vertical" style={{height: '100%'}}>
            <div className="flex-1 flex-vertical" style={{background: 'white'}}>
              <MonitorTable {...props} ref="monitor"/>
            </div>
          </div>
        )
      case 'eventlog':
        return (
          <EventLogTable {...props}/>
        )
      case 'application':
        return (
          <ApplicationTable {...props}/>
        )

      case 'process':
        return (
          <ProcessTable {...props}/>
        )
      case 'monitorlog':
        return (
          <MonitorLogTable device={this.state.currentMonitor} father={device}/>
        )
    }
  }

  renderProcessModal () {
    if (!this.props.processModalOpen) return
    return <ProcessModal {...this.props}/>
  }

  render () {
    const {props} = this
    const {device} = props
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <TabPage>
            <TabPageHeader title={device.name}>
              {this.renderOptions()}
            </TabPageHeader>
            <TabPageBody>
              {this.renderBody()}
              {this.renderProcessModal()}
            </TabPageBody>
          </TabPage>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
