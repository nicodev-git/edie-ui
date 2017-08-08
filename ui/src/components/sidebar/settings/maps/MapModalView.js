import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput } from 'components/modal/parts'

export default class MapModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Dialog open title="Collector" onRequestClose={onHide} contentStyle={{width: 350}}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
            <Field name="description" component={FormInput} floatingLabel="Description"/>
            <Field name="mapgroup" component={FormInput} floatingLabel="Group"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
