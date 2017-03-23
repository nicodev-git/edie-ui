import React from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import { MonitorTplModalView } from '../../../../modal'
import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'

class MonitorTplModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {}
    this.getImageUrl = this.getImageUrl.bind(this)
    this.onClickChangeImage = this.onClickChangeImage.bind(this)
  }

  handleFormSubmit (formProps) {
    const {monitorTpl, selectedTplImage} = this.props
    const tpl = assign({}, (monitorTpl || {}), formProps)
    if (selectedTplImage) tpl.image = selectedTplImage.uuid
    if (monitorTpl) {
      this.props.updateMonitorTemplate(tpl)
    } else {
      this.props.addMonitorTemplate(tpl)
    }
  }

  getImageUrl () {
    const {selectedTplImage, monitorTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) {
      imgUrl = getCustomImageUrl(selectedTplImage)
    } else if (monitorTpl && monitorTpl.image) {
      imgUrl = extImageBaseUrl + monitorTpl.image
    }
    return imgUrl
  }

  onClickClose () {
    this.props.closeMonitorTplModal()
  }

  onClickChangeImage () {
    this.props.openTplImageModal()
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'Monitor Template'
    let imgUrl = this.getImageUrl()
    return (
      <MonitorTplModalView
        show
        header={header}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={this.onClickClose.bind(this)}
        imgUrl={imgUrl}
        onChange={this.onClickChangeImage}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.monitorTpl || {}
  })
)(reduxForm({form: 'monitorTplEdit'})(MonitorTplModal))
