import React from 'react'
import {findIndex} from 'lodash'
import {Chip} from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Create'
import PublicIcon from 'material-ui-icons/Public'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import InfiniteTable from 'components/common/InfiniteTable'

import {chipStyles} from 'style/common/materialStyles'
import {showConfirm} from 'components/common/Alert'
import {getSeverityColor} from 'shared/Global'

export default class GWorkflows extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

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
            {p.data ? <Chip style={chipStyles.smallChip} >Global</Chip> : ''}

            <Chip style={{
              ...chipStyles.smallChip,
              backgroundColor: getSeverityColor(severity)
            }}>
              {severity}
            </Chip>

            {tags.map(t =>
              <Chip key={t} style={chipStyles.smallChip} >
                {t}
              </Chip>
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
      'cssClassName': 'width-120',
      'customComponent': p=> {
        return (
          <div>
            <EditIcon onTouchTap={this.onClickEditWf.bind(this, p.rowData)} className="link"/>
            <DeleteIcon onTouchTap={this.onClickDeleteWf.bind(this, p.rowData)} className="link margin-sm-left"/>

          </div>
        )
      }
    }]
  }
  getDeviceId () {
    return this.props.gauge.deviceId
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  onClickEditWf (wf) {
    this.props.history.push(`/${this.getDevice().name}/editwf/${wf.id}`)
  }

  onClickDeleteWf (wf) {
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.removeWorkflow(wf)
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  getTitle () {
    return '[Workflows]'
    // const {gauge} = this.props
    // const devices = this.props.allDevices || this.props.devices
    // const index = findIndex(devices, {id: gauge.deviceId})
    // if (index < 0) return gauge.name
    // return `[${devices[index].name}] ${gauge.name}`
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const device  = this.getDevice()
    if (!device) return null
    return (
      <div className="flex-vertical flex-1">
        <InfiniteTable
          id="rule1"
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          tableClassName="table1"

          url="/workflow/search/findById"
          params={{
            id: device.workflowids || [],
            draw: this.props.workflowDraw
          }}
        />
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}
        bodyStyle={{padding: '2px 12px'}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
