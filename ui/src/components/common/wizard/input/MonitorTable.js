import React, { Component } from 'react'
import { assign } from 'lodash'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {IconButton, RadioButtonGroup, RadioButton} from 'material-ui'
import {Field} from 'redux-form'

import { CardPanel, FormSelect, FormInput } from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import MonitorPickModal from './MonitorPickModal'

import { extImageBaseUrl } from 'shared/Global'

const colors = '#2468ff #963484 #222629 #3cba54 #999999 #D1282C'.split(' ')

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1,

      monitorConfig: null,
      monitorWizardVisible: false,
      isEditMonitor: false,

      monitorPickerVisible: false
    }
  }

  renderTools () {
    return (
      <div className="pull-right" style={{marginTop: -13}}>
        <IconButton onTouchTap={this.onClickAdd.bind(this)}>
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }

  renderMonitorWizard () {
    if (!this.state.monitorWizardVisible) return

    const {monitorConfig} = this.state
    const type = 'monitor-custom'

    return (
      <MonitorWizardContainer
        deviceType={type}
        title={monitorConfig ? monitorConfig.name : ''}
        onClose={() => { this.setState({ monitorWizardVisible: false }) }}
        extraParams={{ monitortype: monitorConfig.monitortype }}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }

  onClickItem (item) {
    this.setState({ isEditMonitor: false })
    this.addMonitor(assign({}, item, {enable: true}))
  }

  onClickAdd (e) {
    this.setState({ monitorPickerVisible: true })
  }

  onClickEdit (e) {
    let {selected} = this.state
    const {monitors} = this.props
    if (selected < 0) return

    this.setState({ monitorWizardVisible: true, isEditMonitor: true, monitorConfig: monitors[selected] })
    this.props.openDeviceMonitorWizard(monitors[selected])
  }

  onClickRemove () {
    // const {monitors, onChanged} = this.props
    // monitors.splice(selected, 1)
    // selected = -1
    // this.setState({selected, monitors})
    //
    // onChanged && onChanged(monitors)
  }

  addMonitor (monitorConfig) {
    this.props.openDeviceMonitorWizard(monitorConfig)
    this.setState({ monitorWizardVisible: true, monitorConfig })
  }

  onFinishMonitorWizard (res, params) {
    const { monitors, onChanged } = this.props

    let {selected, isEditMonitor} = this.state
    if (isEditMonitor) {
      monitors[selected] = assign({}, monitors[selected], params)
    } else {
      monitors.push(params)
    }
    onChanged && onChanged(monitors)
  }

  onRowDblClick () {
    this.onClickEdit()
  }

  renderMonitorPicker () {
    if (!this.state.monitorPickerVisible) return null
    return (
      <MonitorPickModal
        {...this.props}
        onHide={() => this.setState({monitorPickerVisible: false})}
      />
    )
  }

  render () {
    const {monitorGroups, onChangeMonitorGroupType, allDevices} = this.props
    return (
      <div style={{marginTop: -22}}>
        <CardPanel title="Devices">
          <Field
            name="monitorDevice" label="Device" component={FormSelect} options={[]}/>
        </CardPanel>

        <CardPanel title="Monitor Group">
          <div className="flex-horizontal">
            <div style={{paddingTop: 12}}>
              <RadioButtonGroup
                name="monitorGroupType" defaultSelected="new" onChange={(e, value) => onChangeMonitorGroupType(value)}
                style={{marginTop: 10}}>
                <RadioButton value="new" label="New" className="pull-left"/>
                <RadioButton value="existing" label="Existing" className="pull-left" style={{width: 120, marginTop: 14}}/>
              </RadioButtonGroup>
            </div>
            <div className="flex-1" style={{paddingLeft: 12}}>
              <div>
                <Field name="monitorGroupName" component={FormInput} className="valign-top mr-dialog" floatingLabel="Name" style={{marginTop: -20}}/>
              </div>
              <div style={{marginTop: -4}}>
                <Field
                  name="monitorGroup" label="Monitor Group" component={FormSelect}
                  options={monitorGroups.map(p => ({label: p.name, value: p.id}))}/>
              </div>
            </div>
          </div>


        </CardPanel>
        <CardPanel title="Monitors" tools={this.renderTools()}>
          <div style={{height: 326, overflow: 'auto', padding: '3px'}}>
            <ul className="web-applet-cards">
              {
                this.props.monitors.map((item, index) =>
                  <AppletCard
                    key={index}
                    className="small"
                    color={colors[index % colors.length]}
                    name={item.name}
                    desc={item.monitortype}
                    img={`${extImageBaseUrl}${item.image}`}
                    onClickDelete={this.onClickRemove.bind(this, item)}
                  />
                )
              }
            </ul>


            <table className="table dataTable hover hidden">
              <thead>
              <tr>
                <th width="5%">Type</th>
                <th width="5%">Name</th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.monitors.map((item, index) =>
                  <tr key={index}
                    className={index === this.state.selected ? 'selected' : ''}
                    onClick={() => this.setState({selected: index})}
                    onDoubleClick={this.onRowDblClick.bind(this)}>
                    <td>{item.monitortype}</td>
                    <td>{item.name}</td>
                  </tr>
                )
              }
              </tbody>
            </table>

            {this.renderMonitorWizard()}
            {this.renderMonitorPicker()}
          </div>
        </CardPanel>
      </div>
    )
  }
}

MonitorTable.defaultProps = {
  config: {},
  values: {},
  monitors: [],
  templates: [],
  onChanged: null
}
