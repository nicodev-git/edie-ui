import React from 'react'
import { reduxForm } from 'redux-form'
import {assign, concat} from 'lodash'
import moment from 'moment'
import axios from 'axios'

import MonitorSocket from 'util/socket/MonitorSocket'
import GaugeWizardView from './GaugeWizardView'
import { ROOT_URL } from 'actions/config'
import {showAlert} from 'components/common/Alert'

class GaugeWizard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedSeverity: ['HIGH', 'MEDIUM'],
      dateFrom: moment().startOf('year').valueOf(),
      dateTo: moment().endOf('year').valueOf(),

      services: [],
      selectedMonitors: [],
      serviceNames: []
    }
  }

  componentWillMount () {
    this.props.fetchSysSearchOptions()
    this.props.fetchWorkflows()
    // this.props.fetchMonitorGroups()
  }

  componentDidMount () {
    const {templateName, device} = this.props
    if (device && (templateName === 'Service' || templateName === 'Services')) {
      this.monitorSocket = new MonitorSocket({
        listener: this.onMonitorMessage.bind(this)
      })
      this.monitorSocket.connect(this.onSocketOpen.bind(this))
    }
  }

  componentWillUnmount () {
    if (this.monitorSocket) this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'service',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.setState({
        services: msg.data.service
      })
      setTimeout(() => {
        this.monitorSocket.close()
        this.monitorSocket = null
      }, 1)
    }
  }

  onChangeSeverity (e, index, values) {
    this.setState({
      selectedSeverity: values
    })
  }
  onChangeMonitors (e, index, values) {
    this.setState({
      selectedMonitors: values
    })
  }
  toggleMonitorId (id) {
    let {selectedMonitors} = this.state
    if (selectedMonitors.includes(id)) {
      selectedMonitors = selectedMonitors.filter(p => p !== id)
    } else {
      selectedMonitors = [ ...selectedMonitors, id ]
    }
    this.setState({ selectedMonitors })
  }
  onChangeServiceNames (e, index, values) {
    this.setState({
      serviceNames: values
    })
  }
  onChangeDateRange ({startDate, endDate}) {
    this.setState({
      dateFrom: startDate.valueOf(),
      dateTo: endDate.valueOf()
    })
  }

  getSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }
  handleFormSubmit (formProps) {
    const { selectedSeverity, selectedMonitors, serviceNames, dateFrom, dateTo } = this.state
    const { extraParams, onFinish } = this.props

    const props = assign({
        severities: selectedSeverity,
        monitorIds: selectedMonitors,
        serviceNames: serviceNames,
        dateFrom,
        dateTo
      },
      formProps,
      extraParams
    )
    console.log(props)
    this.closeModal(true)

    if (props.resource === 'logicalgroup') {
      axios.post(`${ROOT_URL}/monitorgroup`, {
        monitorids: props.monitorIds
      }).then(res => {
        props.monitorIds = []
        props.monitorGroupId = res.data.id
        onFinish && onFinish(null, props)
      }).catch(() => {
        showAlert('Add logical group failed.')
      })
    } else {
      onFinish && onFinish(null, props)
    }
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }
  render () {
    const { handleSubmit, sysSearchOptions, monitors, title, formValues, workflows, templateName, devices, device, monitorGroups } = this.props

    const searchList = concat([], this.getSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    })).map(p => ({
      label: p.name,
      value: p.id
    }))

    const durationVisible = templateName !== 'Up/Down'
    const splitVisible = templateName !== 'Table'

    const workflowOptions = workflows.map(p => ({label: p.name, value: p.id}))
    const serviceOptions = this.state.services.map(p => ({label: p.DisplayName || p.ServiceName, value: p.ServiceName}))
    const monitorGroupOptions = monitorGroups.map(p => ({label: p.name, value: p.id}))
    return (
      <GaugeWizardView
        title={title}
        templateName={templateName}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        device={device}
        devices={devices}
        monitors={monitors}
        searchList={searchList}
        services={serviceOptions}
        workflows={workflowOptions}

        formValues={formValues}
        durationVisible={durationVisible}
        splitVisible={splitVisible}

        selectedSeverity={this.state.selectedSeverity}
        onChangeSeverity={this.onChangeSeverity.bind(this)}

        selectedMonitors={this.state.selectedMonitors}
        onChangeMonitors={this.onChangeMonitors.bind(this)}
        toggleMonitorId={this.toggleMonitorId.bind(this)}

        serviceNames={this.state.serviceNames}
        onChangeServiceNames={this.onChangeServiceNames.bind(this)}

        dateFrom={this.state.dateFrom}
        dateTo={this.state.dateTo}
        onChangeDateRange={this.onChangeDateRange.bind(this)}

        monitorGroups={monitorGroupOptions}
      />
    )
  }
}
export default reduxForm({
  form: 'gaugeDeviceForm'
})(GaugeWizard)
