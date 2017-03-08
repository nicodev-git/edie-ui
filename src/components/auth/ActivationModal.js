import React, { Component } from 'react'
import {showAlert} from 'components/shared/Alert'
import { reduxForm } from 'redux-form'
import ActivationModalView from '../modal/ActivationModalView'
import { validate } from '../modal/validation/LicenseValidation'

class ActivationModal extends Component {
  componentWillUpdate (nextProps, nextState) {
    const {activationMsg} = this.props
    if (nextProps.activationMsg && activationMsg !== nextProps.activationMsg) {
      showAlert(nextProps.activationMsg)
    }
  }

  onClickSignup ({email, license}) {
    const params = {
      email: email,
      license: license
    }
    this.props.activateUser(params)
  }

  onHide () {}

  render () {
    const { handleSubmit } = this.props
    return (
      <ActivationModalView
        onHide={this.onHide.bind(this)}
        onSignup={handleSubmit(this.onClickSignup.bind(this))}
      />
    )
  }
}

export default reduxForm({
  form: 'activationModal',
  validate
})(ActivationModal)
