import React, { Component } from 'react'
import moment from 'moment'
import {MenuItem, SelectField} from 'material-ui'

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
      install: 'all'
    }
    this.cells = [{
      'displayName': 'Device',
      'columnName': 'name'
    }, {
      'displayName': 'Version',
      'columnName': 'agent.version'
    }, {
      'displayName': 'Host',
      'columnName': 'agent.host'
    }, {
      'displayName': 'IP',
      'columnName': 'agent.ipaddress'
    }, {
      'displayName': 'Last Seen',
      'columnName': 'agent.lastSeen',
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
        value={this.state.install}>
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
        url="/device/search/findAgents"
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
              {this.renderSelect()}
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
