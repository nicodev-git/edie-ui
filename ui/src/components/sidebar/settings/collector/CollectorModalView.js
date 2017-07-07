import React from 'react'
import {Dialog} from 'material-ui'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput } from 'components/modal/parts'

export default class CollectorModalView extends Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Dialog open title="Collector" onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="version" component={FormInput} label="Version"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Dialog>
    )
  }
}
