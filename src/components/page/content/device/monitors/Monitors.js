import React from 'react'
import {RaisedButton, Menu, MenuItem, Popover, TextField, FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'

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
import { parseSearchQuery } from 'shared/Global'

import { assign } from 'lodash'

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
    console.log('click add monitor')
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

  handleTouchTap (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose () {
    this.setState({
      open: false
    })
  }
  onChangeQuery (e) {
    this.setState({
      query: e.target.value
    })
  }
  onClickSearch () {
    const query = `deviceid=${this.props.device.id} and _all=${this.state.query}`
    const queryChips = parseSearchQuery(query)
    this.props.updateSearchParams(assign(this.props.params, {
      query,
      severity: 'HIGH,MEDIUM',
      collections: 'event',
      workflow: ''
    }))

    this.props.replaceSearchWfs([])
    this.props.updateQueryChips(queryChips)

    this.props.router.push('/search')
  }
  renderSearch () {
    const {selected, query} = this.state
    return (
      <div className={`inline-block ${selected === 'monitors' ? 'hidden' : ''}`}>
        <TextField value={query} onChange={this.onChangeQuery.bind(this)}/>
        <FlatButton icon={<ActionSearch />} onTouchTap={this.onClickSearch.bind(this)}/>
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
              <div className={`pull-left ${selected === 'monitors' ? 'hidden' : ''}`}>
                <RaisedButton label="Show Monitors" onTouchTap={this.onClickShowMonitors.bind(this)}/>
              </div>
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              <RaisedButton label="Add" onTouchTap={this.onClickAddMonitor.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onClickEditMonitor.bind(this)}/>&nbsp;
              <RaisedButton label="Delete" onTouchTap={this.onClickDeleteMonitor.bind(this)}/>&nbsp;

              <RaisedButton label="System" primary onTouchTap={this.handleTouchTap.bind(this)}/>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
              >
                <Menu>
                  <MenuItem primaryText="Event Log" onTouchTap={this.onClickEventLog.bind(this)}/>
                  <MenuItem primaryText="Installed Applications" onTouchTap={this.onClickApplication.bind(this)}/>
                  <MenuItem primaryText="Process" onTouchTap={this.onClickProcess.bind(this)}/>
                </Menu>
              </Popover>
            </div>
            {this.renderSearch()}
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
