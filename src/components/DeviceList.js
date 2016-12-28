import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDevices, openDeviceEditModal, deleteDevice} from '../actions'

import DeviceEditModal from './DeviceEditModal'

class DeviceList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selected: -1
    }
  }

  componentWillMount () {
    this.props.fetchDevices()
  }

  renderDevices () {
        // console.log('DEVICES: ',this.props.devices);
        // if (this.props.devices && this.props.devices.length > 0) {
        //         console.log(this.props.devices[0].name);
        //     return <div>{this.props.devices[0].name}</div>
        // }

    const {selected} = this.state

    return (
            <table className="table table-hover dataTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>LAN IP</th>
                    </tr>
                </thead>
                <tbody>{
                    this.props.devices.map((device, index) =>
                        <tr key={index} className={selected === index ? 'selected' : ''}
                          onClick={this.onClickRow.bind(this, index)}>
                            <td>{device.name}</td>
                            <td>{device.lanIP}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
    )
  }

  renderModal () {
    if (!this.props.openModal) return null
    return (
            <DeviceEditModal />
    )
  }

    // ////////////////////

  onClickRow (selected) {
    this.setState({ selected })
  }

  onClickAdd () {
    this.props.openDeviceEditModal()
  }

  onClickEdit () {
    const {selected} = this.state
    const device = this.props.devices[selected]
    if (!device) return window.alert('Please selected device.')
    this.props.openDeviceEditModal(device)
  }

  onClickDelete () {
    const {selected} = this.state
    const device = this.props.devices[selected]
    if (!device) return window.alert('Please selected device.')
    const url = device._links.self.href
    this.props.deleteDevice(url)
  }

  render () {
    return (
      <div style={{background: 'white'}} className="padding-md">
        <div className="padding-sm fa-lg">
          <a href="javascript:;" className="margin-sm-right" onClick={this.onClickAdd.bind(this)}>
            <i className="fa fa-plus" /></a>
          <a href="javascript:;" className="margin-sm-right" onClick={this.onClickEdit.bind(this)}>
            <i className="fa fa-edit" /></a>
          <a href="javascript:;" className="margin-sm-right" onClick={this.onClickDelete.bind(this)}>
            <i className="fa fa-trash-o" /></a>
        </div>
        {this.renderDevices()}
        {this.renderModal()}
      </div>
    )
  }
}
function mapStateToProps (state) {
    // console.log('DATA', state.devices);
  return {
    devices: state.devices.devices,
    openModal: state.devices.openModal
  }
}
export default connect(mapStateToProps,
    {fetchDevices, openDeviceEditModal, deleteDevice})(DeviceList)
