import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import {showAlert} from 'components/common/Alert'
import CollectorInstallModalView from './CollectorInstallModalView'

class CollectorInstallModal extends React.Component {
  componentWillUpdate(nextProps) {
    const {collectorTestStatus} = nextProps
    if (collectorTestStatus && !this.props.collectorTestStatus) {
      showAlert(collectorTestStatus === 'ok' ?
        'Connection successful.' : 'Connection failed.')
    }
  }

  onHide () {
    this.props.showCollectorInstallModal(false)
  }
  handleFormSubmit (values) {
    console.log(values)
  }
  onClickRefresh () {
    this.props.fetchCollectors()
  }
  onClickTest () {
    const {formValues} = this.props
    if (!formValues.collectorId) {
      showAlert('Please choose collector.')
      return
    }
    this.props.testCollector(formValues.collectorId)
  }
  render () {
    const {collectors} = this.props
    return (
      <CollectorInstallModalView
        onHide={this.onHide.bind(this)}
        onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}

        collectors={collectors}
        onClickRefresh={this.onClickRefresh.bind(this)}
        onClickTest={this.onClickTest.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    formValues: formValueSelector('collectorInstallForm')(state, 'collectorId', 'user')
  })
)(reduxForm({form: 'collectorInstallForm'})(CollectorInstallModal))
