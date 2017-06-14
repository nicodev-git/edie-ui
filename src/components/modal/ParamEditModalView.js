import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import Chip from 'material-ui/Chip'
import { SubmitBlock, FormInput } from './parts'

export default class ParamEditModalView extends Component {
  render () {
    const {onSubmit, onHide, styles, defaultKeys, onKeyClick} = this.props
    return (
      <Dialog open title="Param">
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
            <Field name="key" component={FormInput} label="Key"/>
            <Field name="value" component={FormInput} label="Value"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
