import React, { Component } from 'react'
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
    this.onHide()
  }

  onHide () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this)
    })
  }

  /* onChangeFile (e) {
    const img = window.URL.createObjectURL(e.target.files[0])
    this.setState({ img: img })
  } */

  render () {
    let show = (this.props) ? (this.props.open) : true
    let options = [
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' },
      { value: 'Audit', label: 'Audit' }
    ]
    const { handleSubmit } = this.props
    return (
      <NewIncidentModalView
        show={show}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        options={options}
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
