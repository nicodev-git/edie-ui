import React from 'react'
import MonitorTplModal from '../../../../../components/page/content/settings/template/MonitorTplModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  addMonitorTemplate,
  updateMonitorTemplate,
  closeMonitorTplModal,
  openTplImageModal
} from '../../../../../actions'

@connect(
  state => ({
    monitorTpl: state.settings.monitorTpl,
    selectedTplImage: state.settings.selectedTplImage,
    initialValues: state.settings.monitorTpl || {}
  }),
  dispatch => ({
    ...bindActionCreators({
      closeMonitorTplModal,
      addMonitorTemplate,
      updateMonitorTemplate,
      openTplImageModal
    }, dispatch)
  })
)
export default class MonitorTplModalContainer extends React.Component { // eslint-disable-line react/no-multi-comp
  render () {
    return (
      <MonitorTplModal {...this.props} />
    )
  }
}

MonitorTplModal.defaultProps = {
  onClose: null
}
