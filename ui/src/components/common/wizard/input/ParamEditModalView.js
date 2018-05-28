import React, { Component } from 'react'
import { Field } from 'redux-form'
import Chip from '@material-ui/core/Chip'
import { SubmitBlock, FormInput, Modal, CardPanel } from 'components/modal/parts'

export default class ParamEditModalView extends Component {
  render () {
    const {onSubmit, onHide, styles, defaultKeys, onKeyClick} = this.props
    return (
      <Modal title="Param" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Param">
            <div className="margin-md-bottom" style={styles.wrapper}>
              {defaultKeys.map(k =>
                <Chip
                  key={k}
                  style={styles.chip}
                  onClick={onKeyClick.bind(this, k)}
                  label={k}
                />
              )}
            </div>
            <div className="form-column">
              <Field name="key" component={FormInput} label="Key"/>
              <Field name="value" component={FormInput} label="Value"/>
            </div>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
