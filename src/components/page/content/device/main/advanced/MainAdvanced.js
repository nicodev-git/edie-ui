import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { showAlert } from '../../../../../shared/Alert'

import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'

import { ROOT_URL } from '../../../../../../actions/config'

class MainAdvanced extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onClickSend () {
    let ip = this.state.device.ipaddress
    $.get(`${ROOT_URL}${Api.server.simulation}`, { // eslint-disable-line no-undef
      data: this.refs.message.value,
      ipaddress: ip
    }).done(function (res) {
      showAlert('Sent!')
    }).fail(function () {
      showAlert('Failed!')
    })
  }

  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top" />
        </TabPageHeader>

        <TabPageBody tabs={MainTabs} tab={3}>
          <div className="row">
            <label className="control-label col-md-12"><b>Simulate Incident</b></label>
            <label className="control-label col-md-1">Text: </label>
            <div className="col-md-9">
              <textarea className="form-control col-md-12" style={{height: '120px'}} ref="message" />
            </div>
            <a href="javascript:;" className="btn btn-primary" onClick={this.onClickSend.bind(this)}>Send</a>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}

MainAdvanced.defaultProps = {
}

function mapStateToProps (state) {
  return {device: state.dashboard.selectedDevice}
}

export default withRouter(connect(mapStateToProps)(MainAdvanced))
