import React from 'react'
import {Dialog, IconButton, FlatButton} from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import SetDefIcon from 'material-ui/svg-icons/content/sort'

import {CloseIconButton} from 'components/modal/parts'

const dialogStyle = {
  background: '#efefef',
  padding: '8px 48px 48px',
  overflowY: 'auto'
}
const titleStyle = {
  background: '#324454',
  color: 'white',
  fontSize: 14,
  paddingTop: 12,
  paddingBottom: 12
}

export default class BoardListModalView extends React.Component {
  render () {
    const {onHide, gaugeBoards, selected, onClickAdd, onClickEdit, onClickDelete, onClickSetDefault, onSelect} = this.props
    return (
      <Dialog open title="Dashboards" bodyStyle={dialogStyle} titleStyle={titleStyle} onRequestClose={onHide} contentStyle={{width: 400}}>
        <CloseIconButton onClick={onHide} color="white">
          <IconButton onTouchTap={onClickSetDefault}>
            <SetDefIcon size={32} color="white"/>
          </IconButton>
          <IconButton onTouchTap={onClickAdd}>
            <AddCircleIcon size={32} color="white"/>
          </IconButton>
        </CloseIconButton>
        <div style={{maxHeight: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
            {gaugeBoards.map(p =>
              <tr key={p.id} onClick={() => onSelect(p)} className={selected && selected.id === p.id ? 'selected' : ''}>
                <td>{p.name}</td>
                {p.origin === 'SYSTEM' ? (
                  <td/>
                ) : (
                  <td className="text-right">
                    <IconButton style={{padding: 0, width: 24, height: 24}} onTouchTap={() => onClickEdit(p)}>
                      <EditIcon color="#545454" hoverColor="#f44336"/>
                    </IconButton>&nbsp;&nbsp;&nbsp;
                    <IconButton style={{padding: 0, width: 24, height: 24}} onTouchTap={() => onClickDelete(p)}>
                      <DeleteIcon color="#545454" hoverColor="#f44336"/>
                    </IconButton>
                  </td>
                )}
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </Dialog>
    )
  }
}
