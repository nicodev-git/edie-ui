import React from 'react'
import {Field} from 'redux-form'
import {Dialog} from '@material-ui/core'

import {
  FormInput,
  FormSelect,
  SubmitBlock
} from 'components/modal/parts'


export default class SimulationModalView extends React.Component {
  render () {
    const {fields, onClickAdd, onClickDelete, onSubmit, onClickClose} = this.props
    return (
      <Dialog open title="Mapping">
        <form onSubmit={onSubmit}>
          <Field name={`mapping.from${p.id}`}
                 component={FormInput}
                 floatingLabel="From"
                 className="valign-top margin-md-right"
                 style={{width: 150}}
          />
          <Field name={`mapping.existing${p.id}`}
                 component={FormSelect}
                 floatingLabel="Existing"
                 className="valign-top margin-md-right"
                 options={mappingFieldOptions}
                 style={{width: 150}}
          />
          <Field name={`mapping.to${p.id}`}
                 component={FormInput}
                 floatingLabel="To"
                 className="valign-top"
                 style={{width: 150}}/>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Dialog>
    )
  }
}