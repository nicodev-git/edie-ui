import React from 'react'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, FormSelect, Modal } from 'components/modal/parts'

import {collectorOSTypes} from 'shared/Global'

export default class CollectorModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Collector" onRequestClose={onHide} contentStyle={{width: 350}}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="version" component={FormInput} label="Version"/>
            <Field name="ostype" component={FormSelect} label="Type" options={collectorOSTypes}/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Modal>
    )
  }
}
