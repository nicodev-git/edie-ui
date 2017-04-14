import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import {RaisedButton, Popover, MenuItem, Menu, SelectField} from 'material-ui'
import SettingIcon from 'material-ui/svg-icons/action/settings'

import { findIndex, assign } from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import { ROOT_URL } from '../../../../../actions/config'
import { errorStyle, underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

export default class Agents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      install: 'all',
      tabIndex: 1,
      cellAgents: [{
        'displayName': 'Name',
        'columnName': 'name'
      }, {
        'displayName': 'Map',
        'columnName': 'mapName'
      }, {
        'displayName': 'OS',
        'columnName': 'osname'
      }, {
        'displayName': 'Agent',
        'columnName': 'agentLastSeen',
        'customComponent': (props) => {
          let val = props.data
          let installed = false
          if (val) {
            let diff = new Date().getTime() - val
            installed = diff <= 3600 * 1000
          }

          if (installed) return <span>Installed</span>
          return <span>Not Installed</span>
        }
      }, {
        'displayName': 'Version',
        'columnName': 'agentVersion',
        'customComponent': (props) => {
          let val = props.data
          let installed = false

          if (props.rowData.agentLastSeen) {
            let diff = new Date().getTime() - props.rowData.agentLastSeen
            installed = diff <= 3600 * 1000
          }

          return <span>{installed ? val : ''}</span>
        }
      }, {
        'displayName': 'Last Seen',
        'columnName': 'agentExist',
        'customComponent': (props) => {
          let val = props.rowData.agentLastSeen
          if (!val) return <span />
          return <TimeAgo date={val}/>
        }
      }, {
        'displayName': 'Action',
        'columnName': 'agentUUID',
        'customComponent': (props) => {
          const row = props.rowData
          return (
            <div>
              <a href="javascript:;" onClick={this.showAgentConfigModal.bind(this, row)}>
                <i className="fa fa-edit fa-x"/></a>
              <a href="javascript:;" className="margin-md-left" onClick={this.downloadAgentConfig.bind(this, row)}>
                <i className="fa fa-download fa-x"/></a>
            </div>
          )
        }
      }],

      cellCollectors: [{
        'displayName': 'Name',
        'columnName': 'name'
      }, {
        'displayName': 'OS',
        'columnName': 'hostname',
        'customComponent': (props) => {
          return <span />
        }
      }, {
        'displayName': 'Agent',
        'columnName': 'proxyHost',
        'customComponent': (props) => {
          return <span />
        }
      }, {
        'displayName': 'Version',
        'columnName': 'version',
        'customComponent': (props) => {
          let val = props.data
          let installed = false

          if (props.rowData.lastSeen) {
            let diff = new Date().getTime() - props.rowData.lastSeen
            installed = diff <= 3600 * 1000
          }

          return <span>{installed ? val : ''}</span>
        }
      }, {
        'displayName': 'Last Seen',
        'columnName': 'type',
        'customComponent': (props) => {
          let val = props.rowData.lastSeen
          if (!val) return <span />
          return <TimeAgo date={val}/>
        }
      }],

      cellLog: [{
        'displayName': 'Severity',
        'columnName': 'severity'
      }, {
        'displayName': 'Time',
        'columnName': 'mydatetime',
        'customComponent': (props) => {
          return <span>{moment(new Date(props.data)).format('YYYY-MM-DD HH:mm:ss')}</span>
        }
      }, {
        'displayName': 'Category',
        'columnName': 'category'
      }, {
        'displayName': 'Message',
        'columnName': 'message'
      }]
    }
  }

  onChangeInstall (install) {
    this.setState({ install })
  }

  onChangeAgentTab (tabIndex) {
    this.setState({ tabIndex })
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////

  onClickEditAgentConfig () {
    let selected = this.refs.agents.getSelected()
    if (!selected) return showAlert('Please choose agent.') // eslint-disable-line no-undef

    this.showAgentConfigModal(selected)
  }

  showAgentConfigModal (data) {
    $.get(`${ROOT_URL}${Api.admin.getOptions}`, { // eslint-disable-line no-undef

    }).done(res => {
      const index = findIndex(res.data, {name: 'agent_default_config'})
      if (index < 0) return window.alert('No default agent config.')

      let defaultConfig = null
      try {
        defaultConfig = JSON.parse(res.data[index].value)
      } catch (e) {}

      let config = null

      if (data) {
        try {
          config = assign({}, defaultConfig, JSON.parse(data.agentconfig))
        } catch (e) {}
      }

      if (!config) config = defaultConfig
    })
  }

  onClickDefaultAgentConfig () {
    this.showAgentConfigModal(null)
  }

  onClickDlAgentConfig () {
    let selected = this.refs.agents.getSelected()
    if (!selected) return showAlert('Please choose agent.') // eslint-disable-line no-undef

    this.downloadAgentConfig(selected)
  }

  downloadAgentConfig (selected) {
    let url = `${Api.devices.downloadAgentConfig}?id=${selected.id}&server=${document.location.hostname}` // eslint-disable-line no-undef
    window.open(url, '_blank')
  }

  onClickAddCollector () {

  }

  onClickEditCollector () {

  }

  onClickRemoveCollector () {

  }

  onClickEditCollectorConfig () {

  }

  onClickDlCollectorConfig () {

  }

  onClickAgentTab () {

  }

  handleTouchTap (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose () {
    this.setState({open: false})
  }

  render () {
    const {tabIndex} = this.state
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-left form-inline">
              <SelectField
                errorStyle={errorStyle}
                underlineStyle={underlineFocusStyle}
                selectedMenuItemStyle={selectedItemStyle}
                menuItemStyle={inputStyle}
                labelStyle={inputStyle}
                onChange={this.onChangeInstall.bind(this)}
                value="all">
                <MenuItem value="all" primaryText="All"/>
                <MenuItem value="installed" primaryText="Installed"/>
                <MenuItem value="notinstalled" primaryText="Not Installed"/>
              </SelectField>
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              <div className="inline-block">
                <div className={tabIndex === 1 ? '' : 'hidden'}>
                  <RaisedButton label="Default Config"/>&nbsp;
                  <RaisedButton label="Edit Config"/>&nbsp;
                  <RaisedButton label="Download Config"/>&nbsp;
                </div>

                <div className={tabIndex === 2 ? '' : 'hidden'}>
                  <RaisedButton label="Add Collector"/>&nbsp;
                  <RaisedButton label="Edit Collector"/>&nbsp;
                  <RaisedButton label="Remove Collector"/>&nbsp;
                  <RaisedButton label="Edit Config"/>&nbsp;
                  <RaisedButton label="Download Config"/>&nbsp;
                </div>
              </div>

              <RaisedButton icon={<SettingIcon />} onTouchTap={this.handleTouchTap.bind(this)}/>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
              >
                <Menu>
                  <MenuItem primaryText="Agents" className={tabIndex === 1 ? 'text-bold' : ''}/>
                  <MenuItem primaryText="Collectors" className={tabIndex === 1 ? 'text-bold' : ''}/>
                  <MenuItem primaryText="Agent Logs" className={tabIndex === 1 ? 'text-bold' : ''}/>
                </Menu>
              </Popover>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={1} />
      </TabPage>
    )
  }
}
