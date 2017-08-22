import React from 'react'
import { assign, concat } from 'lodash'
import {IconButton, TextField} from 'material-ui'
import Share from 'material-ui/svg-icons/social/share'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { TwoButtonsBlockCustom, Modal, CardPanel } from 'components/modal/parts'

class SavedSearchModalView extends React.Component {
  renderContent () {
    const {
      onClickOK, onClickClose,
      userOptions,
      sysSearchOptions,
      onClickRow,
      selectedSearch,
      loadingSearchOptions,
      onClickShare,
      savedSearchKeyword,
      onChangeKeyword,
      onClickDelete
    } = this.props

    const keyword = savedSearchKeyword.toLowerCase();
    const options = concat([], userOptions.map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    })).filter(p => (p.name || '').toLowerCase().indexOf(keyword) >= 0
      || (p.description || '').toLowerCase().indexOf(keyword) >= 0)

    return (
      <div>
        <div>
          <TextField value={savedSearchKeyword} floatingLabelText="Search" onChange={onChangeKeyword}/>
        </div>
        <div style={{maxHeight: '350px', overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Origin</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {options.map(p =>
              <tr key={p.id} onClick={() => onClickRow(p)} className={`${selectedSearch && selectedSearch.id === p.id ? 'selected' : ''}`}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.type}</td>
                <td className="p-none">
                  {p.type === 'User' ? <IconButton onTouchTap={() => onClickShare(p)}><Share/></IconButton> : null}
                  {p.type === 'User' ? <IconButton onTouchTap={() => onClickDelete(p)}><DeleteIcon/></IconButton> : null}
                </td>
              </tr>
            )}
            {
              loadingSearchOptions && !options.length ? <tr><td colSpan="3" className="text-center">Loading...</td></tr> : null
            }
            </tbody>
          </table>
        </div>
        <TwoButtonsBlockCustom name1="Search" name2="Close" action1={onClickOK} action2={onClickClose}/>
      </div>
    )
  }
  render () {
    const {
      onClickClose,
      panelMode
    } = this.props
    if (panelMode) return this.renderContent()
    return (
      <Modal title="Saved Search" onRequestClose={onClickClose}>
        <CardPanel title="Saved Search" className="margin-md-bottom">
          {this.renderContent()}
        </CardPanel>
      </Modal>
    )
  }
}

export default SavedSearchModalView
