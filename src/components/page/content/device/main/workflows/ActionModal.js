import React from 'react'
import { assign } from 'lodash'
import SimpleModalContainer from '../../../../../../containers/modal/SimpleModalContainer'
import { validate } from '../../../../../modal/validation/NameValidation'
import { closeWfActionModal } from '../../../../../../actions'

export default class ActionModal extends React.Component {
  doAction (values) {
    const {editWfAction} = this.props
    let props = assign({}, editWfAction, values)
    this.props.onClose(props, editWfAction)
  }

  onClickClose () {
    console.log('closing modal...')
    // TODO
    closeWfActionModal()
  }

  render () {
    let header = 'Action'
    let options = [
      { value: 'OPEN_INCIDENT', label: 'OPEN_INCIDENT' }
    ]
    let content = [
      {name: 'Name'},
      {type: 'select', name: 'Type', options: options},
      {name: 'Command'},
      {name: 'Params'}
    ]
    let initialValues = assign({actionType: 'OPEN_INCIDENT'}, this.props.editWfAction)
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.doAction.bind(this)}
        onClose={this.onClickClose.bind(this)}
        validate={validate}
        initialValues={initialValues}
      />
    )
  }
}
