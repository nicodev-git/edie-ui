import React from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestMessageModalView extends React.Component {
  renderContent () {
    const {messages, onClickAddMsg} = this.props
    return (
      <CardPanel title="Message" tools={<AddIcon className="link" onClick={onClickAddMsg}/>}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Modal title="Test Message" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          {this.renderContent()}
        </form>
        {this.props.children}
      </Modal>
    )
  }
}