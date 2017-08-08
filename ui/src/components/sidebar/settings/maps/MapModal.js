import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import { validate } from 'components/modal/validation/NameValidation'
import { SimpleModalForm } from 'components/modal'

class MapModal extends Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  closeModal () {
    this.props.closeSettingMapModal()
  }

  handleFormSubmit (values) {
    const {editMap} = this.props
    let map = assign({}, editMap, values)
    if (editMap) {
      this.props.updateSettingMap(map)
    } else {
      this.props.addSettingMap(map)
    }
  }

  onKeyUpInput (e) {
    if (e.keyCode === 13) {
      this.onClickSave()
    }
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'Map'
    let content = [
      {name: 'Name'},
      {name: 'Description'},
      {name: 'Map Group'}
    ]
    let buttonText = 'Save'
    return (
      <SimpleModalForm
        show={this.state.open}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        content={content}
        header={header}
        buttonText={buttonText}
      />
    )
  }
}
export default connect(
  state => ({
    initialValues: state.settings.editMap,
    validate: validate
  })
)(reduxForm({form: 'mapEditForm'})(MapModal))
