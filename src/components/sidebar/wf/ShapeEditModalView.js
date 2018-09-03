import React, {Component} from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {Button} from '@material-ui/core'

import {
  FormInput,
  Modal,
  FormTextArea,
  CardPanel
} from 'components/modal/parts'

export default class ShapeEditModalView extends Component {
  render () {
    const {onSubmit, onClickClose,
      onClickAddField, onClickEditField, onClickDeleteField,
      fields,
      onClickTest, children
    } = this.props
    return (
      <Modal title="Shape" contentStyle={{width: 1000}} onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="title" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
            <Field name="description" component={FormInput} floatingLabel="Description" fullWidth
                   className="margin-sm-top"/>
          </CardPanel>

          <CardPanel title="Script" tools={<AddIcon className="link" onClick={onClickAddField}/>}>
            <Field name="script" component={FormTextArea} style={{width: '100%', height: 300, fontSize: '14px'}}/>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Testing Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {fields.map((p, i) =>
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.value}</td>
                  <td>
                    <EditIcon className="link" onClick={() => onClickEditField(i)}/>
                    <DeleteIcon className="link" onClick={() => onClickDeleteField(i)}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </CardPanel>

          <CardPanel title="Result">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Result</th>
                </tr>
              </thead>
            </table>
          </CardPanel>

          <div className="form-buttons">
            <Button variant="raised" type="submit" color="primary">Save</Button>
            <Button variant="raised" className="margin-md-left" onClick={onClickTest}>Test</Button>
          </div>
        </form>
        {children}
      </Modal>
    )
  }
}
