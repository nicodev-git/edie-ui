import React, { Component } from 'react'
import moment from 'moment'
import {MenuItem, SelectField, RaisedButton} from 'material-ui'

import InfiniteTable from 'components/common/InfiniteTable'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import CollectorTabs from '../collector/CollectorTabs'
import AgentModal from './AgentModal'

import { errorStyle, inputStyle, selectedItemStyle } from 'style/common/materialStyles'
import {showAlert, showConfirm} from 'components/common/Alert'

export default class Agents extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.cells = [{
      'displayName': 'Device',
      'columnName': 'deviceId'
    }, {
      'displayName': 'Version',
      'columnName': 'version'
    }, {
      'displayName': 'Host',
      'columnName': 'host'
    }, {
      'displayName': 'IP',
      'columnName': 'ipaddress'
    }, {
      'displayName': 'Last Seen',
      'columnName': 'lastSeen',
      'customComponent': p => {
        if (!p.data) return <span/>
        return (
          <span>{moment(p.data).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      }
    }]
  }

  onChangeInstall (install) {
    this.setState({ install })
  }

  onRowDblClick () {
  }

  onClickAdd () {
    this.props.showAgentModal(true)
  }
  onClickEdit () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose agent.')
    this.props.showAgentModal(true, selected)
  }
  onClickRemove () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose agent.')
    showConfirm('Click OK to remove.', btn => {
      if (btn !== 'ok') return
      this.props.removeAgent(selected)
    })
  }
  getTable () {
    return this.refs.table
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

  renderAgentModal () {
    if (!this.props.agentModalOpen) return null
    return (
      <AgentModal {...this.props}/>
    )
  }

  renderContent () {
    return (
      <InfiniteTable
        url="/deviceagent"
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}
        params={{
          draw: this.props.agentDraw
        }}
      />
    )
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Agents">
          <div className="text-center margin-md-top">
            <div className="pull-left form-inline text-left">
              &nbsp;
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              <CollectorTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={1} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
          {this.renderAgentModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
