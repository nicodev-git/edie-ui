import React, {Component} from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'
import SimpleModalForm from 'components/modal/SimpleModalForm'

class SimpleModalContainer extends Component {
  handleFormSubmit (props) {
    this.props.doAction(props)
    this.onHide()
  }

  onHide () {
    this.props.onClose && this.props.onClose()
  }

  render () {
    const {handleSubmit, ...props} = this.props
    let buttonText = (this.props.buttonText) ? (this.props.buttonText) : 'Save'
    return (
      <SimpleModalForm
        show
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        buttonText={buttonText}
        {...props}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    validate: props.validate,
    initialValues: props.initialValues,
    allValues: getFormValues('simpleModalForm')(state),

    workflows: state.workflow.workflows,
    collectors: state.dashboard.collectors,
    brainCells: state.settings.brainCells
  }), {})(reduxForm({
  form: 'simpleModalForm'
})(SimpleModalContainer))
