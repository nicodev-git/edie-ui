import React from 'react'
import {Form, Field} from 'redux-form'
import {Button} from '@material-ui/core'

import {CardPanel, FormInput, ModalFull} from 'components/modal/parts'

export default class RangeAddModalView extends React.Component {
  render () {
    const {onSubmit, onHide} = this.props
    return (
      <ModalFull title="Range" onRequestClose={onHide} contentStyle={{maxWidth: 'initial', width: '100%'}}
             className="modal-full">
        <Form onSubmit={onSubmit}>
          <CardPanel title="Range">
            <Field name="from" component={FormInput} floatingLabel="From" />
            <Field name="to" component={FormInput} floatingLabel="To" className="margin-md-left" />
            <Button variant="raised" type="submit">Scan</Button>
          </CardPanel>

          <CardPanel title="Result">
            <div style={{minHeight: 300}}>

            </div>
          </CardPanel>
        </Form>
      </ModalFull>
    )
  }
}
