import React from 'react'
import { reduxForm } from 'redux-form'
import {assign, concat} from 'lodash'

import GaugeWizardView from './GaugeWizardView'

class GaugeWizard extends React.Component {
  componentWillMount () {
    this.props.fetchSysSearchOptions()
  }
  getSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }
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
    const { handleSubmit, sysSearchOptions } = this.props

    const searchList = concat([], this.getSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))

    return (
      <GaugeWizardView
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}

        searchList={searchList}
      />
    )
  }
}
export default reduxForm({
  form: 'gaugeDeviceForm'
})(GaugeWizard)
