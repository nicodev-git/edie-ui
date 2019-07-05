import React from 'react'
import {IconButton, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Create'

import Modal from 'components/modal/parts/Modal'
import CardPanel from 'components/modal/parts/CardPanel'

export default class LogFiltersModalView extends React.Component {
  render () {
    const {onHide, logFilters, onClickRow, onClickAdd, onClickDelete, onClickEdit, selectedSearch,
      onClickSearch, canEdit} = this.props
    return (
      <Modal title="Filters" onRequestClose={onHide}>
        <CardPanel title="Filters"
                   tools={canEdit && <IconButton onClick={onClickAdd}><AddCircleIcon size={32}/></IconButton>}>
          <div style={{maxHeight: '350px', overflow: 'auto', width: '100%'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Keyword</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {logFilters.map(p =>
                <tr key={p.id} onClick={() => onClickRow(p)}
                    className={`${selectedSearch && selectedSearch.id === p.id ? 'selected' : ''}`}>
                  <td>{p.keyword}</td>
                  <td className="p-none nowrap">
                    {canEdit && <IconButton onClick={() => onClickDelete(p)}><DeleteIcon/></IconButton>}
                    {canEdit && <IconButton onClick={() => onClickEdit(p)}><EditIcon/></IconButton>}
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>

        <div className="form-buttons">
          <Button variant="raised" onClick={onClickSearch}>Search</Button>
        </div>
      </Modal>
    )
  }
}
