import React from 'react'
import {Chip} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PublicIcon from '@material-ui/icons/Public'
import {findIndex} from 'lodash'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {extImageBaseUrl, getSeverityColor} from 'shared/Global'
import {chipStyles} from 'style/common/materialStyles'

import InfiniteTable from 'components/common/InfiniteTable';
import MainWorkflowModal from 'components/dashboard/map/device/main/workflows/MainWorkflowModal'
import {showConfirm} from 'components/common/Alert'
import {hasPermission} from 'shared/Permission'

export default class DeviceWf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name',
      'cssClassName': 'width-240'
    }, {
      'displayName': 'Description',
      'columnName': 'desc',
      'cssClassName': 'width-240'
    }, {
      'displayName': 'Details',
      'columnName': 'isglobal',
      'customComponent': p => {
        let {severity, tags} = p.rowData
        tags = tags || []
        return (
          <div style={chipStyles.wrapper}>
            <Chip style={{
              ...chipStyles.smallChip,
              backgroundColor: getSeverityColor(severity)
            }} label={severity}/>

            {tags.map(t =>
              <Chip key={t} style={chipStyles.smallChip} label={t}/>
            )}

            {p.rowData.isglobal ? (
              <PublicIcon />
            ) : null}
          </div>
        )
      }
    }, {
      'displayName': 'Action',
      'columnName': 'id',
      'cssClassName': 'width-80',
      'customComponent': p=> {
        const canEdit = hasPermission(this.props.userInfo, 'EditDeviceWorkflow')
        if (!canEdit) return <div/>
        return (
          <div>
            <EditIcon onClick={this.onClickEditWf.bind(this, p.rowData)} className="link"/>
            <DeleteIcon onClick={this.onClickDeleteWf.bind(this, p.rowData)} className="link margin-sm-left"/>
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

  getSelectedDevice () {
    let {selected} = this.state
    if (!selected) return null

    const {devices} = this.props
    const index = findIndex(devices, {id: selected.id})
    if (index >= 0) selected = devices[index]
    return selected
  }

  getTable () {
    return this.refs.table
  }

  onClickEditWf (wf) {
    this.props.history.push(`/${this.state.selected.name}/editwf/${wf.id}`)
  }

  onClickDeleteWf (wf) {
    const device = this.getSelectedDevice()
    if (!device) return
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.updateMapDevice({
        ...device,
        workflowids: device.workflowids.filter(p => p !== wf.id)
      })
    })
  }

  onClickDevice (selected) {
    this.setState({selected})
  }

  onClickEdit () {
    const selected = this.getTable().getSelected()
    if (!selected) return window.alert('Please select workflow.')
    // this.props.openDeviceWorkflowModal(selected, this.state.selected)
    this.props.history.push(`/${this.state.selected.name}/editwf/${selected.id}`)
  }

  onClickAddWf () {
    const {selected} = this.state
    if (!selected) return
    this.props.history.push(`/${selected.name}/addwf?z=${selected.id}`)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  renderDevices () {
    const {selected} = this.state
    return (
      <table className="table table-hover">
        <tbody>
        {this.getDevices().map(p =>
            <tr key={p.id} className={`${selected && selected.id === p.id ? 'text-danger' : ''}`}>
              <td onClick={this.onClickDevice.bind(this, p)} style={{cursor: 'pointer'}}>
                <img src={`${extImageBaseUrl}${p.image}`}
                     width="28" alt="" className="valign-middle bg-black"/>
                &nbsp;{p.name}
              </td>
            </tr>
        )}
        </tbody>
      </table>
    )

  }

  renderWorkflows (canEdit) {
    const selected = this.getSelectedDevice()
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
          draw: this.props.workflowDraw
        }}

        onRowDblClick={canEdit ? this.onClickEdit.bind(this) : null}
      />
    )
  }

  renderWorkflowModal () {
    if (!this.props.workflowModalOpen) return null
    return (
      <MainWorkflowModal
        {...this.props}
        device={this.state.selected}
      />
    )
  }

  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditDeviceWorkflow')
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
              <div className="header-red margin-xs-right relative">
                Workflows
                {canEdit ? (
                  <div style={{position: 'absolute', right: 4, top: 8}}>
                    <AddCircleIcon className="link" onClick={this.onClickAddWf.bind(this)}/>
                  </div>
                ) : null}
              </div>
              <div className="flex-1 flex-vertical paper-bg">
                {this.renderWorkflows(canEdit)}
              </div>
            </div>

            {this.renderWorkflowModal()}
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
