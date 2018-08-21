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
      addedAction: [],
      editableActionIndex: 0
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
    this.setState({
      addedAction: [1]
    })
  }
  onAddAction = () => (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (this.state.newAction.trim()) {
        this.props.onSave({
          name: this.state.newAction,
          id: uuid()
        })
      }
  
      this.setState({
        newAction: ''
      })
      this.setState({
        addedAction: []
      })

    }
    // tools={<AddIcon className="link" onClick={this.onClickAddEmptyAction}/>}
  }

  test = (e) => () => {
    console.log(e)
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
          <CardPanel title="Actions" tools={<AddIcon className="link" onClick={this.onClickAddEmptyAction}/>}> 
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {actions.map((p, i) =>
                        <TableRow key={i}>
                          <TableCell
                            onClick={this.test(i)}
                            component="th" 
                            scope="row">
                              {p.name}
                              {/* <input value={p.name} disabled={this.state.editableActionIndex === i ? true : false}/> */}
                          </TableCell>
                          <TableCell className="nowrap">
                            <EditIcon className="link margin-sm-right" onClick={() => onClickEditAction(i)}/>
                            <DeleteIcon className="link" onClick={() => onClickDeleteAction(i)}/>
                          </TableCell>
                        </TableRow>
                      )}
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