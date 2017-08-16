import React from 'react'
import {Field} from 'redux-form'

import {Modal, FormInput, SubmitBlock} from 'components/modal/parts'

export default class TagModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal title="Tag" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} type="text" floatingLabel="Name"/>
            <Field name="desc" component={FormInput} type="text" floatingLabel="Description"/>
            <Field name="order" component={FormInput} type="text" floatingLabel="Order"/>
          </div>
          <SubmitBlock name="Save" onClick={onClickClose}/>
        </form>
      </Modal>
    )
  }
}
