import React from 'react'
import {Chip} from 'material-ui'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {extImageBaseUrl} from 'shared/Global'
import {chipStyles} from 'style/common/materialStyles'

import InfiniteTable from 'components/common/InfiniteTable';

export default class DeviceWf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }, {
      'displayName': 'Details',
      'columnName': 'isglobal',
      'customComponent': p => {
        let {severity, tags} = p.rowData
        tags = tags || []
        return (
          <div style={chipStyles.wrapper}>
            {p.data ? <Chip style={chipStyles.smallChip} labelStyle={chipStyles.smallLabel}>Global</Chip> : ''}

            <Chip style={chipStyles.smallChip} labelStyle={chipStyles.smallLabel} backgroundColor="rgb(234, 166, 11)">
              {severity}
            </Chip>

            {tags.map(t =>
              <Chip key={t} style={chipStyles.smallChip} labelStyle={chipStyles.smallLabel}>
                {t}
              </Chip>
            )}
          </div>
        )
      }
    }]
  }

  componentWillMount () {
    this.props.fetchDevices()
  }

  getDevices () {
    return this.props.devices.filter(p => p.tags && p.tags.includes('Server'))
  }

  onClickDevice (selected) {
    this.setState({selected})
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  renderDevices () {
    const {selected} = this.state
    return this.getDevices().map(p =>
      <div key={p.id} className={`padding-sm bt-gray ${selected && selected.id === p.id ? 'text-danger' : ''}`}>
        <span className="link" onClick={this.onClickDevice.bind(this, p)}>
          <img src={`${extImageBaseUrl}${p.image}`}
               width="16" alt="" className="valign-middle bg-black"/>
          &nbsp;{p.name}
        </span>
      </div>
    )

  }

  renderWorkflows () {
    const {selected} = this.state
    if (!selected) return null

    return (
      <InfiniteTable
        id="rule1"
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        tableClassName="table1"

        url="/workflow/search/findById"
        params={{
          id: selected.workflowids || [],
          draw: 1
        }}
      />
    )
  }

  render () {
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Device Workflows</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location} transparent>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div className="flex-vertical" style={{minWidth: 300, marginRight: 5}}>
              <div className="header-blue relative margin-xs-right">Device</div>
              <div className="flex-1 paper-bg" style={{overflow: 'auto'}}>
                {this.renderDevices()}
              </div>
            </div>
            <div className="flex-vertical flex-1" style={{overflow: 'auto'}}>
              <div className="header-red margin-xs-right">Workflows</div>
              <div className="flex-1 flex-vertical paper-bg">
                {this.renderWorkflows()}
              </div>
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
