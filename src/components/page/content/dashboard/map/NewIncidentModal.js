import React, { Component } from 'react'
import { showAlert } from '../../../../shared/Alert'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import { NewIncidentModalView } from '../../../../modal'

class NewIncidentModal extends Component {
  handleFormSubmit ({name, desc, select, files}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('desc: ', desc)
    console.log('select: ', select)
    console.log('file: ', files)
  }

  onHide () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {
    let name = this.state.name
    if (!name) return showAlert('Please input name.')
    let desc = this.state.desc
    let severity = this.state.severity
    this.addIncident(name, desc, severity, '')
  }

  addIncident (name, desc, severity, img) {
    console.log('name: ', name)
  }

  onChangeFile (e) {
    const img = window.URL.createObjectURL(e.target.files[0])
    this.setState({ img: img })
  }

  render () {
    let show = (this.props) ? (this.props.open) : true
    const { handleSubmit } = this.props
    return (
      <NewIncidentModalView
        show={show}
        onHide={this.onHide.bind(this)}
        onChangeImg={this.onChangeFile.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    open: true,
    img: '/images/adminlogin.png'
  }), {})(reduxForm({
    form: 'newIncidentModal',
    validate
  })(NewIncidentModal))
