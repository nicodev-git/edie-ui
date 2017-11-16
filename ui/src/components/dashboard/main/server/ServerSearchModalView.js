import React from 'react'
import {Form, Field} from 'redux-form'
import {RaisedButton, Checkbox} from 'material-ui'

import {Modal, CardPanel, FormCheckbox, FormInput} from 'components/modal/parts'

const checkStyle = {
  width: 200
}
const inputStyle = {
  width: 50
}

export default class ServerSearchModalView extends React.Component {
  render () {
    const {onHide, onSubmit, osNames, selectedOS, onCheckOS} = this.props
    return (
      <Modal title="Search" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Search">
            <div>
              <div className="inline-block valign-middle nowrap" style={checkStyle}>
                <Field name="diskEnabled" component={FormCheckbox} label="Free space less than"/>
              </div>

              <Field name="diskSize" component={FormInput} className="valign-middle margin-sm-left" style={inputStyle}/>
              <label className="valign-middle">GB</label>
            </div>
            <div>
              <div className="inline-block valign-middle nowrap" style={checkStyle}>
                <Field name="ipEnabled" component={FormCheckbox} label="Contains IP"/>
              </div>
              <Field name="ip" component={FormInput} className="valign-middle margin-sm-left" style={{width: 150}}/>
            </div>

            <div>
              <div className="inline-block valign-middle nowrap" style={checkStyle}>
                <Field name="memoryEnabled" component={FormCheckbox} label="Memory more than "/>
              </div>
              <Field name="memorySize" component={FormInput} className="valign-middle margin-sm-left" style={inputStyle}/>
              <label className="valign-middle">GB</label>
            </div>

          </CardPanel>

          <CardPanel title="OS">
            {osNames.map(p =>
              <Checkbox key={p} name={p} label={p} checked={selectedOS.includes(p)}
                        onCheck={(e, checked) => onCheckOS(p, checked)}/>
            )}
          </CardPanel>

          <div className="form-buttons">
            <RaisedButton label="Search" type="submit"/>
          </div>
        </Form>
      </Modal>
    )
  }
}
