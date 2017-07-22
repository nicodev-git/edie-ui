import React from 'react'
import { reduxForm } from 'redux-form'

import GaugeWizardView from './GaugeWizardView'

class GaugeWizard extends React.Component {
  handleFormSubmit (formProps) {
    console.log(formProps)
    // const { extraParams, onFinish, editParams, canAddTags, monitorTags } = this.props
    // const { monitors, currentDevice } = this.state
    // let params = {}
    // if (editParams) {
    //   editParams.forEach(p => {
    //     params[p.key] = p.value
    //   })
    // }
    //
    // let props = assign(
    //   {},
    //   formProps,
    //   currentDevice.server.params || {},
    //   extraParams, {
    //     monitors: monitors.map(m => assign({}, m, {id: null})),
    //     params
    //   }
    // )
    // if (canAddTags) props.tags = monitorTags || []
    // console.log(props)
    // this.closeModal(true)
    // onFinish && onFinish(null, props, currentDevice.server.url)
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }
  render () {
    const { handleSubmit } = this.props
    return (
      <GaugeWizardView
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}
export default reduxForm({
  form: 'gaugeDeviceForm'
})(GaugeWizard)
