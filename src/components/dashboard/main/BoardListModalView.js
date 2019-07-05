import React from 'react'
import {IconButton, Chip, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/ModeEdit'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SetDefIcon from '@material-ui/icons/Sort'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

import {Modal, CardPanel} from 'components/modal/parts'

export default class BoardListModalView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newBoard: '',
      addedBoard: [],
      test: false
    }
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value
    })
  }

  onClickAddEmptyField = key => event => {
    this.setState({
      [key]: [1],
      test: true
    })
  }

  onAddField = key => event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (key === 'board') {
        if (this.state.newBoard.trim()) {
          this.props.onSaveSystem(this.state.newBoard.trim())
        }
        
        this.setState({
          newBoard: '',
          addedBoard: []
        })
      }
    }
  }

  renderTools () {
    const {
      // onClickAdd,
      onClickAddSystem,
      onClickSetDefault
    } = this.props
    return (
      <div>
        <IconButton onClick={onClickSetDefault} tooltip="Set Default">
          <SetDefIcon size={32}/>
        </IconButton>
        <IconButton onClick={this.onClickAddEmptyField('addedBoard')} tooltip="Add New Dashboard">
          <AddCircleIcon size={32}/>
        </IconButton>
        <IconButton onClick={onClickAddSystem} tooltip="Add New System Dashboard" className="hidden">
          <NoteAddIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const {
      onHide,
      gaugeBoards,
      selected,
      onClickEdit,
      onClickDelete,
      onSelect,
      defaultBoardId
    } = this.props
    return (
      <Modal title="Dashboards" onRequestClose={onHide}>
        <CardPanel title="Dashboards" tools={this.renderTools()}>
          <div style={{maxHeight: 300, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th></th>
                <th className="text-right">Actions</th>
              </tr>
              </thead>
              <tbody>
              {gaugeBoards.filter(p => p.type !== 'system').map(p =>
                <tr key={p.id} onClick={() => onSelect(p)} className={selected && selected.id === p.id ? 'selected' : ''}>
                  <td>{p.name}</td>
                  <td>{p.type || 'normal'}</td>
                  <td className="text-center">
                    {p.id === defaultBoardId ? (
                      <Chip style={{margin: 'auto'}} label="Default"/>
                    ) : null}
                  </td>
                  {p.origin === 'SYSTEM' ? (
                    <td/>
                  ) : (
                    <td className="text-right">
                      <IconButton style={{padding: 0, width: 24, height: 24}} onClick={() => onClickEdit(p)}>
                        <EditIcon nativeColor="#545454"/>
                      </IconButton>&nbsp;&nbsp;&nbsp;
                      <IconButton
                        style={{padding: 0, width: 24, height: 24}} onClick={() => onClickDelete(p)}
                        className={p.type === 'system' ? 'hidden' : ''}>
                        <DeleteIcon nativeColor="#545454"/>
                      </IconButton>
                    </td>
                  )}
                </tr>
              )}
              { this.state.addedBoard.map((p,i) => 
                <tr key={i}>
                  <td>
                    <TextField
                      autoFocus
                      fullWidth
                      value={this.state.newBoard} 
                      onChange={this.handleChange('newBoard')}
                      onKeyPress={this.onAddField('board')}
                      label="Name"/>
                  </td>
                </tr>
              )}
              {/* { this.state.test ? (
                <tr>
                  <td>
                    <TextField
                      autoFocus
                      fullWidth
                      value={this.state.newBoard} 
                      onChange={this.handleChange('newBoard')}
                      onKeyPress={this.onAddField('board')}
                      label="Name"/>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                </tr>
              )} */}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}
