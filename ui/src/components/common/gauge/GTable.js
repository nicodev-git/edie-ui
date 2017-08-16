import React from 'react'
import moment from 'moment'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import NormalTable from './display/NormalTable'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import { dateFormat, severities } from 'shared/Global'

export default class GTable extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      value: parseInt(Math.random() * 100, 10)
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

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

  getParams () {
    const {searchList, gauge} = this.props
    const {resource, duration, durationUnit, workflowId, savedSearchId} = gauge

    const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).format(dateFormat)
    const dateTo = moment().endOf(durationUnit).format(dateFormat)

    if (resource === 'incident')  {
      const searchParams = {
        draw: this.props.incidentDraw,
        query: '',
        workflow: workflowId || '',
        collections: 'incident,event',
        dateFrom,
        dateTo,
        severity: severities.map(p => p.value).join(','),
        tag: '',
        monitorTypes: '',
        sort: 'startTimestamp,desc'
      }
      return searchParams
    }

    const index = findIndex(searchList, {id: savedSearchId})
    if (index < 0) {
      console.log('Saved search not found.')
      return {
        draw: this.props.incidentDraw,
        dateFrom,
        dateTo,
        query: '',
        workflow: '',
        collections: 'incident,event',
        severity: 'HIGH,MEDIUM',
        tag: '',
        monitorTypes: '',
        sort: 'startTimestamp,desc'
      }
    }
    const searchParams = JSON.parse(searchList[index].data)

    const params = { ...searchParams,
      draw: this.props.incidentDraw,
      dateFrom,
      dateTo,
      sort: 'startTimestamp,desc'
    }

    return params
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    return (
      <div className="flex-vertical flex-1">
        <NormalTable
          {...this.props}
          params={this.getParams()}
          viewFilter=""
          viewCols={[]}
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

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
