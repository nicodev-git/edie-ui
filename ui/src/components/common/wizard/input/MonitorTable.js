import React, { Component } from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import { assign } from 'lodash'

import { CrudButtons } from 'components/modal/parts'
import { buttonStyle, iconStyle } from 'style/common/materialStyles'

import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'

export default class MonitorTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuHidden: true,
      selected: -1,

      monitorConfig: null,
      monitorWizardVisible: false,
      isEditMonitor: false
    }
  }

  renderMenu () {
    return this.props.templates.map(item => this.renderMenuItem(item))
  }

  renderMenuItem (item) {
    return (
      <MenuItem key={item.id} primaryText={item.name} onTouchTap={this.onClickItem.bind(this, item)}/>
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
    this.setState({ menuHidden: true, isEditMonitor: false })
    this.addMonitor(assign({}, item, {enable: true}))
  }

  onClickAdd (e) {
    this.setState({ menuHidden: false })
  }

  onClickEdit (e) {
    let {selected} = this.state
    const {monitors} = this.props
    if (selected < 0) return

    this.setState({ monitorWizardVisible: true, isEditMonitor: true, monitorConfig: monitors[selected] })
    this.props.openDeviceMonitorWizard(monitors[selected])
  }

  onClickRemove () {
    let {selected} = this.state
    const {monitors, onChanged} = this.props
    if (selected < 0) return
    monitors.splice(selected, 1)
    selected = -1
    this.setState({selected, monitors})

    onChanged && onChanged(monitors)
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

  render () {
    return (
      <div className="panel panel-default panel-noborder">
        <div className="monitors-wizard-crud">
          <div className="inline-block">Monitors</div>
          <IconMenu
            iconButtonElement={
              <div className="add-button">
                <IconButton
                  style={buttonStyle}
                  iconStyle={iconStyle}
                  onTouchTap={this.onClickAdd.bind(this)}>
                  <AddCircleIcon color="#545454"/>
                </IconButton>
              </div>
            }
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            {this.renderMenu()}
          </IconMenu>
          <CrudButtons
            onEdit={this.onClickEdit.bind(this)}
            onDelete={this.onClickRemove.bind(this)}
          />
        </div>

        <div className="panel-body"
          style={{minHeight: '100px', maxHeight: '350px', overflow: 'auto', padding: '3px'}}>
          <table className="table dataTable hover">
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
        </div>
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
