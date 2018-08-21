import React from 'react'
import {Field} from 'redux-form'
import {Table, TableBody, TableCell, TableHead, TableRow, TextField, Button} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import uuid from 'uuid'

import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductTypeModalView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newAction: ''
    }
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value
    })
  }

  onNewActionAdd = () => (event) => {
    event.preventDefault()

    this.props.onSave({
      name: this.state.newAction,
      id: uuid()
    })

    this.setState({
      newAction: ''
    })
  }

  render () {
    const {
      onClose,
      onSubmit,
      actions,
      onClickEditAction,
      onClickDeleteAction,
      grokFields,
      onClickAddGrokField,
      onClickEditGrokField,
      onClickDeleteGrokField
    } = this.props
    return (
      <Modal title="Product Type" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Product Type">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
          </CardPanel>
          <CardPanel title="Actions">
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <Table>
                <TableHead>
                    <TableRow>
                      <TableCell>
                        <TextField
                            style={{width: 400}}
                            value={this.state.newAction} 
                            onChange={this.handleChange('newAction')}
                            label="Name"/>
                        <Button
                          style={{marginLeft: 20}}
                          variant="contained" 
                          color="primary" 
                          onClick={this.onNewActionAdd()}>
                            Add
                        </Button>
                      </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                  {actions.map((p, i) =>
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{p.name}</TableCell>
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

          <CardPanel title="Grok Fields" tools={<AddIcon className="link" onClick={onClickAddGrokField}/>}>
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {grokFields.map((p, i) =>
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{p}</TableCell>
                      <TableCell className="nowrap">
                        <EditIcon className="link margin-sm-right" onClick={() => onClickEditGrokField(i)}/>
                        <DeleteIcon className="link" onClick={() => onClickDeleteGrokField(i)}/>
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