import React from 'react'
import { reduxForm } from 'redux-form'
import { assign, concat } from 'lodash'
import { connect } from 'react-redux'
import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'
import { DeviceTplModalView } from 'components/modal'

class DeviceTplView extends React.Component {
  componentWillMount () {
    const {initialValues} = this.props
    const {workflowids} = initialValues
    if (workflowids && workflowids.length) {
      this.props.fetchDeviceTplWorkflows(workflowids)
    }
  }

  handleFormSubmit (formProps) {
    const {deviceTpl, selectedTplImage} = this.props
    const tpl = assign({}, (deviceTpl || {}), formProps, {
      monitors: this.props.monitors
    })
    if (selectedTplImage) tpl.image = selectedTplImage.uuid
    if (deviceTpl) { this.props.updateDeviceTemplate(tpl) } else {
      this.props.addDeviceTemplate(tpl)
    }
  }

  getImageUrl () {
    const {selectedTplImage, deviceTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) {
      imgUrl = getCustomImageUrl(selectedTplImage)
    } else if (deviceTpl && deviceTpl.image) {
      imgUrl = extImageBaseUrl + deviceTpl.image
    }
    return imgUrl
  }

  onClickAddMonitor (item) {
    const monitors = concat([], this.props.monitors, item)
    this.props.updateSelectedDeviceTplMonitors(monitors)
  }

  onClickEditMonitor (item) {
    this.props.openMonitorTplModal(item)
  }

  onClickRemoveMonitor (index) {
    const monitors = this.props.monitors.filter((m, i) => i !== index)
    this.props.updateSelectedDeviceTplMonitors(monitors)
  }

  onClickChangeImage () {
    this.props.openTplImageModal()
  }

  renderOptions () {
    let categories = this.props.deviceCategories
    let options = categories.map(m => ({value: m.name, label: m.name}))
    return options
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'Device Template'
    let imgUrl = this.getImageUrl()
    let options = this.renderOptions()
    return (
      <DeviceTplModalView
        show
        innerView
        header={header}
        monitors={this.props.monitors}
        monitorTemplates={this.props.monitorTemplates}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        options={options}
        imgUrl={imgUrl}
        onChange={this.onClickChangeImage.bind(this)}
        onAddMonitor={this.onClickAddMonitor.bind(this)}
        onRemoveMonitor={this.onClickRemoveMonitor.bind(this)}
        onEditMonitor={this.onClickEditMonitor.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.selectedDeviceTpl || {}
  })
)(reduxForm({form: 'deviceTplView'})(DeviceTplView))
