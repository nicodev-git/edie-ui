import React from 'react'
import { ChromePicker } from 'react-color'
import { showAlert } from '../../../../../shared/Alert'

class Websocket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      lineColor: 'red'
    }
  }

  componentDidMount () {

  }

  onClickAddIncident () {
    const refs = this.refs

    $.get(Api.test.addIncident, { // eslint-disable-line no-undef
      name: refs.incidentName.value,
      description: refs.incidentDesc.value,
      severity: refs.incidentSeverity.value
    }).done((res) => {
      showAlert(res.success ? 'Added successfully!' : 'Add failed!')
    })
  }

  onClickUpdateOpenIncident () {
    $.get(Api.test.changeOpenIncidentCount, { // eslint-disable-line no-undef
      count: this.refs.openIncident.value || 0
    }).done((res) => {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickUpdateTodayIncident () {
    $.get(Api.test.changeTodayIncidentCount, { // eslint-disable-line no-undef
      count: this.refs.todayIncident.value || 0
    }).done((res) => {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickUpdateAttackerToday () {
    $.get(Api.test.changeAttackerTodayCount, { // eslint-disable-line no-undef
      count: this.refs.attackerToday.value || 0
    }).done((res) => {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickUpdateMonthIncident () {
    $.get(Api.test.changeMonthIncidentCount, { // eslint-disable-line no-undef
      count: this.refs.monthIncident.value || 0
    }).done((res) => {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickPushNews () {
    $.get(Api.test.pushNews, { // eslint-disable-line no-undef
      news: this.refs.news.value
    }).done(function (res) {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickUpdateDeviceStatus () {
    $.get(Api.test.changeDeviceStatus, { // eslint-disable-line no-undef
      deviceId: this.refs.deviceId.value || 0,
      status: this.refs.deviceStatus.value
    }).done(function (res) {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

    // //////////////////////////////////////

  onClickUpdateColor () {
    $.get(Api.test.changeConnectorColor, { // eslint-disable-line no-undef
      connectorId: this.refs.connectorId.value || 0,
      color: this.state.lineColor
    }).done(function (res) {
      showAlert(res.success ? 'Notified!' : 'Failed!')
    })
  }

  onClickColorPicker () {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  onCloseColorPicker () {
    this.setState({ displayColorPicker: false })
  }

  onChangeColorPicker (color) {
    this.setState({ lineColor: color.hex })
  }

  render () {
    const popover = {
      position: 'absolute',
      zIndex: '2',
      left: '-40px',
      top: '30px'

    }
    const cover = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    return (
      <div className="padding-md">
        <div className="form-inline margin-md-bottom">
          <label>Name:</label>
          <input type="text" className="form-control input-sm margin-md-right" ref="incidentName" defaultValue="Test1" />

          <label>Description:</label>
          <input type="text" className="form-control input-sm margin-md-right" ref="incidentDesc" />

          <label>Severity:</label>
          <select ref="incidentSeverity" className="form-control input-sm margin-md-right">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Audit</option>
          </select>

          <a href="javascript:;" className="btn btn-primary btn-sm" onClick={this.onClickAddIncident.bind(this)}>Add Incident</a>
        </div>

        <h4>BI</h4>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Open Incidents:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 defaultValue="1"
                 ref="openIncident"/>

          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickUpdateOpenIncident.bind(this)}>Update</a>
        </div>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Today Incidents:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 defaultValue="1"
                 ref="todayIncident"/>

          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickUpdateTodayIncident.bind(this)}>Update</a>
        </div>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Attackers Today:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 ref="attackerToday" defaultValue="1" />

          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickUpdateAttackerToday.bind(this)}>Update</a>
        </div>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Month Incidents:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 ref="monthIncident" defaultValue="1" />

          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickUpdateMonthIncident.bind(this)}>Update</a>
        </div>

        <div className="form-inline margin-md-bottom">
          <label className="width-120">Incident News:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 ref="news" style={{width: '300px'}} />

          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickPushNews.bind(this)}>Push</a>
        </div>

        <h4>Device</h4>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Device ID:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 ref="deviceId" />

          <select className="form-control input-sm margin-md-right" ref="deviceStatus">
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
          <a href="javascript:;" className="btn btn-primary btn-sm"
             onClick={this.onClickUpdateDeviceStatus.bind(this)}>Update</a>
        </div>
        <div className="form-inline margin-md-bottom">
          <label className="width-120">Connection ID:</label>
          <input type="text" className="form-control input-sm margin-md-right"
                 ref="connectorId" />

          <div className="inline valign-middle">
            <div className="input-group colorpicker-element"
                 onClick={this.onClickColorPicker.bind(this)}>
              <div className="input-group-addon">
                <i className="color-preview" style={{background: this.state.lineColor}} />
              </div>
            </div>

            {
              this.state.displayColorPicker ? <div style={popover}>
                <div style={cover} onClick={this.onCloseColorPicker.bind(this)}/>
                <ChromePicker color={this.state.lineColor}
                              onChangeComplete={this.onChangeColorPicker.bind(this)}/>
              </div> : null
            }
          </div>

          <a href="javascript:;" className="btn btn-primary btn-sm margin-md-left"
             onClick={this.onClickUpdateColor.bind(this)}>Update</a>
        </div>
      </div>
    )
  }
}

Websocket.defaultProps = {}

export default Websocket
