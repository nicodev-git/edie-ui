import React from 'react'
import {Form, Field} from 'redux-form'

import {Modal, CardPanel, FormCheckbox, FormInput, SubmitBlock} from 'components/modal/parts'

export default class ServerSearchModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Search" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Search">
            <div>
              <div className="inline-block valign-middle nowrap">
                <Field name="diskEnabled" component={FormCheckbox} label="Free space less than"/>
              </div>

              <Field name="diskSize" component={FormInput} className="valign-middle margin-sm-left"/>
            </div>
            <div>
              <div className="inline-block valign-middle nowrap">
                <Field name="ipEnabled" component={FormCheckbox} label="Contains IP"/>
              </div>
              <Field name="ip" component={FormInput} className="valign-middle margin-sm-left"/>
            </div>

            <div>
              <div className="inline-block valign-middle nowrap">
                <Field name="memoryEnabled" component={FormCheckbox} label="Have more memory than "/>
              </div>
              <Field name="memory" component={FormInput} className="valign-middle margin-sm-left"/>
            </div>

          </CardPanel>

          <SubmitBlock name="Search"/>
        </Form>
      </Modal>
    )
  }
}
