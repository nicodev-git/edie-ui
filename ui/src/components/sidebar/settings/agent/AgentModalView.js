import React from 'react'
import { Field } from 'redux-form'
import { SubmitBlock, FormInput, Modal } from 'components/modal/parts'

export default class AgentModalView extends React.Component {
  render () {
    const {onHide, onSubmit} = this.props
    return (
      <Modal title="Agent" onRequestClose={onHide} contentStyle={{width: 350}}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="Name"/>
            <Field name="version" component={FormInput} label="Version"/>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
      </Modal>
    )
  }
}
