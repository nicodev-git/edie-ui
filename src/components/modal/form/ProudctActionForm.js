import React from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  CardPanel
} from 'components/modal/parts'

export default class ProductActionForm extends React.Component {
  render () {
    return (
      <div>
        <CardPanel title="Action">
          <Field name="field" component={FormInput} floatingLabel="Action Id"
                 className="valign-top margin-md-right"/>
          <Field name="varField" component={FormInput} floatingLabel="Type Id"
                 className="valign-top margin-md-right"/>
          <Field name="sentence" component={FormInput} floatingLabel="Action Name"
                 className="valign-top margin-md-right"/>
        </CardPanel>

      </div>
    )
  }
}
