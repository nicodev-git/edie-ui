import React from 'react'
import {findIndex} from 'lodash'
import {Chip} from 'material-ui'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import InfiniteTable from 'components/common/InfiniteTable'

import {chipStyles} from 'style/common/materialStyles'
import {gaugeTitleStyle1} from 'style/common/materialStyles'

export default class GWorkflows extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

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
            draw: 1,
            // sort: `${currentSortCol},${currentSortDir}`
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

        titleStyle={gaugeTitleStyle1}
        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}
        title={this.getTitle()}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
