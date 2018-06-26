import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import MonitorSocket from 'util/socket/MonitorSocket'
import InfiniteTable from 'components/common/InfiniteTable'

import {gaugeTitleStyle1} from 'style/common/materialStyles'

import {strSorter, numSorter} from 'util/Sorter'
import {getMonitorResult} from 'shared/Global'

export default class GProcessList extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      currentSortCol: 'Cpu',
      currentSortDir: 'asc',
      processes: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Filename',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Id',
      'columnName': 'Id',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'cssClassName': 'width-80'
    }, {
      'displayName': 'Owner',
      'columnName': 'Owner',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'cssClassName': 'width-220'
    }, {
      'displayName': 'Parent',
      'columnName': 'Parent',
      'customHeaderComponent': this.renderColHeader.bind(this),
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Location',
      'columnName': 'Location',
      'customHeaderComponent': this.renderColHeader.bind(this)
    }, {
      'displayName': 'CPU',
      'columnName': 'Cpu',
      'customHeaderComponent': this.renderColHeader.bind(this)
    }, {
      'displayName': 'Memory',
      'columnName': 'Mem',
      'customHeaderComponent': this.renderColHeader.bind(this)
    }]
  }

  componentDidMount () {
    this.startUpdate()
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevProps.gauge) !== JSON.stringify(this.props.gauge)) {
      this.stopUpdate()
      setTimeout(() => {
        this.startUpdate()
      }, 10)
    }
  }

  componentWillUnmount () {
    this.stopUpdate()
  }

  startUpdate () {
    this.setState({
      processes: []
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    // this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  renderColHeader (col) {
    const {columnName, title} = col
    const { currentSortCol, currentSortDir } = this.state
    let caretEl = null

    if (columnName === currentSortCol) {
      caretEl = currentSortDir === 'asc' ? '▲': '▼  '
    }

    return (
      <span className="nowrap text-black link" onClick={this.onClickColHeader.bind(this, col)}>
        {title}{caretEl}
      </span>
    )
  }

  onClickColHeader (col) {
    const {
      columnName
    } = col
    let { currentSortCol, currentSortDir, processes } = this.state

    if (columnName === currentSortCol) {
      currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc'
    } else {
      currentSortCol = columnName
      currentSortDir = 'asc'
    }

    processes = this.sortData(currentSortCol, currentSortDir, processes)

    this.setState({ currentSortCol, currentSortDir, processes })

  }

  sortData (col, dir, data) {
    const sorter = ['Mem', 'Cpu', 'Id'].includes(col) ? numSorter : strSorter
    const result = [...data]
    result.sort(sorter.bind(this, col, dir === 'desc'))
    return result
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'process',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      const {process} = msg.data
      const { currentSortCol, currentSortDir } = this.state
      if (!process) return
      this.setState({
        processes: this.sortData(currentSortCol, currentSortDir, process)
      })
    }
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

  getTitle () {
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    const device = this.getDevice()
    const processes = getMonitorResult(device, 'process')

    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'Id'}}
        selectable
        rowHeight={40}

        useExternal={false}
        data={processes || []}
      />
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
