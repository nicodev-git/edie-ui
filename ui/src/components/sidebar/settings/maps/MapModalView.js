import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput } from 'components/modal/parts'

export default class MapModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Dialog open title="Collector" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormInput} floatingLabel="Name" className="mr-dialog"/>
          <Field name="description" component={FormInput} floatingLabel="Description"/>
          <Field name="mapgroup" component={FormInput} floatingLabel="Group" className="mr-dialog"/>
          <div style={{maxHeight: 250, overflow: 'auto'}}>

          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
