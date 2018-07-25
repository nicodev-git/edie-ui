import React from 'react'
import {Field} from 'redux-form'

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
      <CardPanel title="Test Message Modal">
        <Field
          name="name"
          component={FormInput}
          floatingLabel="Name"
          className="valign-top margin-md-right"
        />
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Message</th>
            </tr>
            </thead>
            <tbody>
            {messages.map(p =>
              <tr>
                <td></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
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