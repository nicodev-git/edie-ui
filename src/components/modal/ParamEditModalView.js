import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Field } from 'redux-form'
import Chip from 'material-ui/Chip'
import { Header, SubmitBlock, FormInput } from './parts'

export default class ParamEditModalView extends Component {
  render () {
    const {onSubmit, onHide, styles, defaultKeys, onKeyClick} = this.props
    return (
      <Modal
        show
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Param" />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="margin-md-bottom" style={styles.wrapper}>
              {defaultKeys.map(k =>
                <Chip
                  key={k}
                  style={styles.chip}
                  onTouchTap={onKeyClick.bind(this, k)}
                >
                  {k}
                </Chip>
              )}
            </div>
            <div className="form-column">
              <Field name="Key" component={FormInput} label="Key"/>
              <Field name="Value" component={FormInput} label="Value"/>
            </div>
            <SubmitBlock name="Save" onClick={onHide}/>
          </form>
        </div>
      </Modal>
    )
  }
}
