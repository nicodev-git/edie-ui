import React from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import beautify from 'json-beautify'

import {
  FormInput,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class TestCaseModalView extends React.Component {
  renderContent () {
    const {messages, onClickAddMsg, onClickEditMsg, noModal} = this.props
    const content = (
      <div>
        <Field
          name="name"
          component={FormInput}
          floatingLabel="Name"
          className="valign-top margin-md-right"
        />
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Message</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {messages.map((p, i) =>
              <tr key={i}>
                <td>{beautify(p, null, 2, 60)}</td>
                <td><EditIcon className="link" onClick={() => onClickEditMsg(p)}/></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (noModal) return content

    return (
      <CardPanel title="Test Case" tools={<AddIcon className="link" onClick={onClickAddMsg}/>}>
        {content}
      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose} = this.props
    return (
      <Modal title="Test Case" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          {this.renderContent()}
          <SubmitBlock name="Save"/>
        </form>
        {this.props.children}
      </Modal>
    )
  }
}