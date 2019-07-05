import React from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'
import {simulationTypes} from 'shared/Global'

export default class TestGroupModalView extends React.Component {
  render () {
    const {onClickClose, onSubmit} = this.props
    return (
      <Modal title="Group" onRequestClose={onClickClose}>
        <form  onSubmit={onSubmit}>
          <CardPanel title="Group">
            <Field
                name="name"
                component={FormInput}
                floatingLabel="Name"
                className="valign-top margin-md-right"/>

            <Field
              name="type"
              component={FormSelect}
              floatingLabel="Type"
              options={simulationTypes}
              style={{minWidth: 150}}
            />
          </CardPanel>
          <SubmitBlock name="OK"/>
        </form>
      </Modal>
    )
  }
}