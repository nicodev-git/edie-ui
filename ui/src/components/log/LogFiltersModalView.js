import React from 'react'
import {IconButton, RaisedButton} from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import EditIcon from 'material-ui/svg-icons/content/create'

import Modal from 'components/modal/parts/Modal'
import CardPanel from 'components/modal/parts/CardPanel'

export default class LogFiltersModalView extends React.Component {
  render () {
    const {onHide, logFilters, onClickRow, onClickAdd, onClickDelete, onClickEdit, selectedSearch,
      onClickSearch} = this.props
    return (
      <Modal title="Filters" onRequestClose={onHide}>
        <CardPanel title="Filters"
                   tools={<IconButton onTouchTap={onClickAdd}><AddCircleIcon size={32}/></IconButton>}>
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
                    <IconButton onTouchTap={() => onClickDelete(p)}><DeleteIcon/></IconButton>
                    <IconButton onTouchTap={() => onClickEdit(p)}><EditIcon/></IconButton>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>

        <div className="form-buttons">
          <RaisedButton label="Search" onTouchTap={onClickSearch}/>
        </div>
      </Modal>
    )
  }
}
