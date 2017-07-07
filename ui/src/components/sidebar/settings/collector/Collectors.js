import React from 'react'
import {RaisedButton} from 'material-ui'

import CollectorTabs from './CollectorTabs'
import InfiniteTable from 'components/common/InfiniteTable'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import CollectorModal from './CollectorModal'

export default class Collectors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Version',
      'columnName': 'version'
    }, {
      'displayName': 'Last Seen',
      'columnName': 'lastSeen'
    }]
  }
  onRowDblClick () {
  }
  renderContent () {
    return (
      <InfiniteTable
        url="/collector"
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}
        params={{
          draw: this.props.collectorDraw
        }}
      />
    )
  }
  onClickAdd () {
    this.props.showCollectorModal(true)
  }
  getTable () {
    return this.refs.credentials
  }
  renderCollectorModal () {
    if (!this.props.collectorModalOpen) return null
    return (
      <CollectorModal {...this.props}/>
    )
  }
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onClickAdd.bind(this)}/>&nbsp;
              <CollectorTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={1} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}
