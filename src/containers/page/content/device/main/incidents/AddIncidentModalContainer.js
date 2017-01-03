import React from 'react'
import AddIncidentModal from '../../../../../../components/page/content/device/main/incidents/AddIncidentModal'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { closeAddDeviceIncident, addDeviceIncident } from '../../../../../../actions'

@connect(
  state => ({ device: state.dashboard.selectedDevice }),
  dispatch => ({
    ...bindActionCreators({
      closeAddDeviceIncident,
      addDeviceIncident
    }, dispatch)
  })
)
export default class AddIncidentModalContainer extends React.Component {
  render () {
    return (
      <AddIncidentModal {...this.props} />
    )
  }
}
