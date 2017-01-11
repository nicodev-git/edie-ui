import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
  Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'
import { showAlert } from 'components/shared/Alert'

class ParserTypeModal extends React.Component {
  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.closeParserTypeModal()
  }

  handleFormSubmit (values) {
    const { editParserType } = this.props

    let props = assign({}, editParserType, values)

    if (!props.name) return showAlert('Please type name.')

    if (editParserType) {
      this.props.updateParserType(props)
    } else {
      this.props.addParserType(props)
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
             aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Parser Type
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close"
                    onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field name="name" component="input" type="text" label="Name"/>
            <Field name="filters" component="input" type="text" label="Filters"/>

            <div className="text-right">
              <Button className="btn-primary btn-sm" type="submit">Save</Button>
              <Button className="btn-sm margin-sm-left"
                      onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default ParserTypeModal