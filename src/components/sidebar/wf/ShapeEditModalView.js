import React, {Component} from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'

import {
  FormInput,
  SubmitBlock,
  Modal,
  FormTextArea,
  CardPanel
} from 'components/modal/parts'

export default class ShapeEditModalView extends Component {
  render () {
    const {onSubmit, onClickClose, onClickAddField} = this.props
    return (
      <Modal title="Shape" contentStyle={{width: 1000}}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="title" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
            <Field name="description" component={FormInput} floatingLabel="Description" fullWidth
                   className="margin-sm-top"/>

            <div className="margin-sm-top" style={{color: 'rgba(0, 0, 0, 0.54)'}}>Script</div>
            <Field name="script" component={FormTextArea} style={{width: '100%', height: 300, fontSize: '14px'}}/>
          </CardPanel>

          <CardPanel title="Fields" tools={<AddIcon className="link" onClick={onClickAddField}/>}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </CardPanel>
          <SubmitBlock name="Save" onCancel={onClickClose}/>
        </form>
      </Modal>
    )
  }
}
