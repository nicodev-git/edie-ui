import React, { Component } from 'react'

import {RaisedButton, MenuItem, SelectField, IconButton} from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import DeviceTplModal from './DeviceTplModal'
import MonitorTplModal from './MonitorTplModal'
import ImageUploaderModal from './ImageUploaderModal'

import { showConfirm } from 'components/shared/Alert'
import { errorStyle, underlineFocusStyle, inputStyle, selectedItemStyle } from 'style/materialStyles'

export default class Templates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'Device',
      selected: -1
    }
  }

  componentWillMount () {
    this.props.fetchDeviceTemplates()
    this.props.fetchMonitorTemplates()
    this.props.fetchDeviceCategories()
  }

  onClickRow (selected) {
    this.setState({ selected })
  }

  renderDeviceTemplates () {
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            this.props.deviceTemplates.map((item, index) =>
              <tr key={item.id}
                className={index === this.state.selected ? 'selected' : ''}
                onClick={this.onClickRow.bind(this, index)}>
                <td>{item.name}</td>
                <td className="text-right fa-lg">
                  {item.origin !== 'SYSTEM' && <IconButton
                    style={{padding: 0, width: 24, height: 24}}
                    onTouchTap={this.onClickDeleteDeviceTpl.bind(this, item)}>
                    <DeleteIcon color="#545454" hoverColor="#f44336"/>
                  </IconButton>}
                </td>
              </tr>
            )
          }
          </tbody>
        </table>

        {this.renderDeviceTplModal()}
        {this.renderMonitorTplModal()}
      </div>
    )
  }

  renderMonitorTemplates () {
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            this.props.monitorTemplates.map((item, index) =>
              <tr key={item.id}
                className={index === this.state.selected ? 'selected' : ''}
                onClick={this.onClickRow.bind(this, index)}>
                <td>{item.name}</td>
                <td className="text-right fa-lg">
                  {item.origin !== 'SYSTEM' && <IconButton
                    style={{padding: 0, width: 24, height: 24}}
                    onTouchTap={this.onClickDeleteMonitorTpl.bind(this, item)}>
                    <DeleteIcon color="#545454" hoverColor="#f44336"/>
                  </IconButton>}
                </td>
              </tr>
            )
          }
          </tbody>
        </table>

        {this.renderMonitorTplModal()}
      </div>
    )
  }

  renderDeviceTplModal () {
    if (!this.props.deviceTplModalVisible) return null
    return (
      <DeviceTplModal {...this.props} />
    )
  }

  renderMonitorTplModal () {
    if (!this.props.monitorTplModalVisible) return null
    return (
      <MonitorTplModal {...this.props} />
    )
  }

  renderTplImageModal () {
    if (!this.props.tplImageModalVisible) return null
    return (
      <ImageUploaderModal {...this.props} />
    )
  }

  onClickAddDeviceTpl () {
    this.props.openDeviceTplModal()
  }

  onClickEditDeviceTpl (item) {
    this.props.openDeviceTplModal(item)
  }

  onClickDeleteDeviceTpl (item) {
    showConfirm('Click OK to remove.', btn => {
      if (btn !== 'ok') return
      this.props.deleteDeviceTemplate(item)
    })
  }

  onClickAddMonitorTpl () {
    this.props.openMonitorTplModal()
  }

  onClickEditMonitorTpl (item) {
    this.props.openMonitorTplModal(item)
  }

  onClickDeleteMonitorTpl (item) {
    showConfirm('Click OK to remove.', btn => {
      if (btn !== 'ok') return
      this.props.deleteMonitorTemplate(item)
    })
  }

  onChangeType (e, index, value) {
    this.setState({ type: value, selected: -1 })
  }

  onClickAdd () {
    if (this.state.type === 'Device') this.onClickAddDeviceTpl()
    else this.onClickAddMonitorTpl()
  }

  onClickEdit () {
    const { selected, type } = this.state
    if (selected < 0) return window.alert('Please select item.')
    if (type === 'Device') {
      this.onClickEditDeviceTpl(this.props.deviceTemplates[selected])
    } else {
      this.onClickEditMonitorTpl(this.props.monitorTemplates[selected])
    }
  }

  render () {
    const {type} = this.state
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
              <SelectField
                errorStyle={errorStyle}
                underlineStyle={underlineFocusStyle}
                selectedMenuItemStyle={selectedItemStyle}
                menuItemStyle={inputStyle}
                labelStyle={inputStyle}
                onChange={this.onChangeType.bind(this)}
                value={type}>
                <MenuItem value="Device" primaryText="Device"/>
                <MenuItem value="Monitor" primaryText="Monitor"/>
              </SelectField>
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              <RaisedButton label="Add" onTouchTap={this.onClickAdd.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onClickEdit.bind(this)}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={7}>
          <div className="row padding-md">
            <div className="col-md-3">
              {type === 'Device' ? this.renderDeviceTemplates() : this.renderMonitorTemplates()}
            </div>
          </div>
          {this.renderTplImageModal()}

        </TabPageBody>
      </TabPage>
    )
  }
}
