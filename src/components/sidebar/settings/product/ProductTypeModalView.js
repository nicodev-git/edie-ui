import React from 'react'
import {Field} from 'redux-form'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductTypeModalView extends React.Component {
  render () {
    const {onClose, onSubmit,
      actions, onClickAddAction, onClickEditAction, onClickDeleteAction} = this.props
    return (
      <Modal title="Product Type" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Product Type">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
          </CardPanel>
          <CardPanel title="Actions" tools={<AddIcon className="link" onClick={onClickAddAction}/>}>
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Regex</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {actions.map((p, i) =>
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{p.name}</TableCell>
                      <TableCell>{p.regex}</TableCell>
                      <TableCell className="nowrap">
                        <EditIcon className="link margin-sm-right" onClick={() => onClickEditAction(i)}/>
                        <DeleteIcon className="link" onClick={() => onClickDeleteAction(i)}/>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
        {this.props.children}
      </Modal>
    )
  }
}