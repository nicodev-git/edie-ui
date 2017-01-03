import React from 'react'
import DeviceSearchModal from '../../../../components/page/content/search/DeviceSearchModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchIncidentDevices } from '../../../../actions'

@connect(
  state => ({ incidentDevices: state.search.incidentDevices }),
  dispatch => ({
    searchIncidentDevices: bindActionCreators(searchIncidentDevices, dispatch)
  })
)
export default class DeviceSearchModalContainer extends React.Component {
  render () {
    return (
      <DeviceSearchModal {...this.props} />
    )
  }
}

DeviceSearchModal.defaultProps = {
  onClose: null,
  selected: []
}
