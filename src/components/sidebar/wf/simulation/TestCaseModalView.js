import React from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'
import AddSimpleIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CopyIcon from '@material-ui/icons/ContentCopy'
import {Button} from '@material-ui/core'
import {keys} from 'lodash'

import {
  FormInput,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class TestCaseModalView extends React.Component {
  render () {
    const {onSubmit, onClickClose, messages,
      onClickAddMsg, onClickEditMsg, onClickDeleteMsg, onClickCopyMsg,
      onClickPost,
      noModal
    } = this.props

    const content = (
      <div>
        <Field
          name="name"
          component={FormInput}
          floatingLabel="Name"
          className="hidden"
        />
        <Field
          name="description"
          component={FormInput}
          floatingLabel="Description"
          className="margin-md-top hidden"
          fullWidth
        />
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>
                <span>Message</span>
              </th>
              <th>
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            {messages.map((p, i) =>
              <tr key={i}>
                <td>{
                  (() => {
                    const valueKeys = keys(p.values)
                    return valueKeys.map((k, ki) =>
                      [
                        <span key={k} className="field-key">
                          {k} =
                        </span>,
                        <span key={`${k}-1`} className="field-value">
                          {p.values[k]}
                        </span>,
                        (valueKeys.length - 1) !== ki ?
                          <div key={`${k}-2`} className="field-separator"></div> : null
                      ]
                    )
                  })()
                }</td>
                <td className="nowrap">
                  <CopyIcon className="link" onClick={() => onClickCopyMsg(p)}/>
                  <EditIcon className="link" onClick={() => onClickEditMsg(p)}/>
                  <DeleteIcon className="link" onClick={() => onClickDeleteMsg(i)}/>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (noModal) {
      return (
        <div className="relative" style={{height: '100%'}}>
          <div style={{height: '100%', overflow: 'auto'}}>
            <form onSubmit={onSubmit}>
              {content}
              <div className="text-right">
                {onClickPost && <Button variant="contained" color="primary" onClick={onClickPost} className="margin-md-right">Post</Button>}
                {/*<Button variant="contained" type="submit">Save</Button>*/}
              </div>
            </form>
            {this.props.children}
          </div>
          <Button variant="fab" color="primary" aria-label="Add" style={{position: 'absolute', right: 10, bottom: 10}}
                  onClick={onClickAddMsg}>
            <AddSimpleIcon />
          </Button>
        </div>
      )
    }

    return (
      <Modal title="Test Case" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Test Case">
            {content}
          </CardPanel>
          {/*<SubmitBlock name="Save"/>*/}
        </form>
        {this.props.children}
      </Modal>
    )
  }
}