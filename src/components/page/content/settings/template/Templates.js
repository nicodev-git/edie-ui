import React, { Component } from 'react'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import DeviceTplModal from './DeviceTplModal'
import MonitorTplModal from './MonitorTplModal'
import ImageUploaderModal from './ImageUploaderModal'

export default class Templates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'Device'
    }
  }

  componentWillMount () {
    this.props.fetchDeviceTemplates()
    this.props.fetchMonitorTemplates()
  }

  renderDeviceTemplates () {
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            this.props.deviceTemplates.map(item =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-right fa-lg">
                  <a href="javascript:;" onClick={this.onClickEditDeviceTpl.bind(this, item)}>
                      <i className="fa fa-edit" />
                  </a>
                  <a href="javascript:;" className="margin-sm-left" onClick={this.onClickDeleteDeviceTpl.bind(this, item)}>
                      <i className="fa fa-trash-o" />
                  </a>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>

        {this.renderDeviceTplModal()}
      </div>
    )
  }

  renderMonitorTemplates () {
    return (
      <div>
        <table className="table table-hover dataTable">
          <tbody>
          {
            this.props.monitorTemplates.map(item =>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-right fa-lg">
                  <a href="javascript:;" onClick={this.onClickEditMonitorTpl.bind(this, item)}>
                      <i className="fa fa-edit" />
                  </a>
                  <a href="javascript:;" className="margin-sm-left" onClick={this.onClickDeleteMonitorTpl.bind(this, item)}>
                      <i className="fa fa-trash-o" />
                  </a>
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
    this.props.deleteDeviceTemplate(item)
  }

  onClickAddMonitorTpl () {
    this.props.openMonitorTplModal()
  }

  onClickEditMonitorTpl (item) {
    this.props.openMonitorTplModal(item)
  }

  onClickDeleteMonitorTpl (item) {
    this.props.deleteMonitorTemplate(item)
  }

  onChangeType (e) {
    this.setState({ type: e.target.value })
  }

  onClickAdd () {
    if (this.state.type === 'Device') this.onClickAddDeviceTpl()
    else this.onClickAddMonitorTpl()
  }

  render () {
    const {type} = this.state
    return (
      <TabPage>
        <TabPageHeader title="Settings" />

        <TabPageBody tabs={SettingTabs} tab={7}>
          <div className="form-inline padding-md">
            <select className="form-control" value={type} onChange={this.onChangeType.bind(this)}>
              <option>Device</option>
              <option>Monitor</option>
            </select>
            <a href="javascript:;" className="fa fa-plus-square margin-md-left fa-lg"
              onClick={this.onClickAdd.bind(this)} />
          </div>
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
