import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import {RaisedButton, MenuItem, SelectField} from 'material-ui'

import { findIndex, assign } from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import CollectorTabs from '../collector/CollectorTabs'

import { ROOT_URL } from 'actions/config'
import { errorStyle, inputStyle, selectedItemStyle } from 'style/common/materialStyles'

export default class Agents extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.cellAgents = [{
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
    }]
  }

  onChangeInstall (install) {
    this.setState({ install })
  }

  renderSelect () {
    return (
      <SelectField
        errorStyle={errorStyle}
        selectedMenuItemStyle={selectedItemStyle}
        menuItemStyle={inputStyle}
        labelStyle={inputStyle}
        onChange={this.onChangeInstall.bind(this)}
        value="all">
        <MenuItem value="all" primaryText="All"/>
        <MenuItem value="installed" primaryText="Installed"/>
        <MenuItem value="notinstalled" primaryText="Not Installed"/>
      </SelectField>
    )
  }

  render () {
    const {tabIndex} = this.state
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-left form-inline text-left">
              &nbsp;
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              <CollectorTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={1} history={this.props.history} location={this.props.location}/>
      </TabPage>
    )
  }
}
