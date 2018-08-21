import React from 'react'
import {Field} from 'redux-form'
import {Table, TableBody, TableCell, TableHead, TableRow, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import uuid from 'uuid'

import {Modal, CardPanel, SubmitBlock, FormInput} from 'components/modal/parts'

export default class ProductTypeModalView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAction: '',
      addedAction: [1]
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

  onClickAddEmptyAction = () => {
    this.state.addedAction.push('')
    this.setState({
      addedAction: this.state.addedAction
    })
    console.log(this.state)
  }
  onAddAction = () => (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.props.onSave({
        name: this.state.newAction,
        id: uuid()
      })
  
      this.setState({
        newAction: ''
      })

    }
    // tools={<AddIcon className="link" onClick={this.onClickAddEmptyAction}/>}
    console.log(event.key)
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
        <form onSubmit={onSubmit} >
          <CardPanel title="Product Type">
            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
          </CardPanel>
          <CardPanel title="Actions"> 
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <Table>
                <TableHead>
                  {this.state.addedAction.map((p, i) =>
                    <TableRow key={i}>
                      <TableCell>
                          <TextField
                            fullWidth
                            value={this.state.newAction} 
                            onChange={this.handleChange('newAction')}
                            onKeyPress={this.onAddAction()}
                            label="Name"/>
                        </TableCell>
                    </TableRow>
                  )}
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