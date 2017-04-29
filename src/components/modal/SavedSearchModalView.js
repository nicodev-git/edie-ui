import React from 'react'
import Modal from 'react-bootstrap-modal'
import { assign, concat } from 'lodash'

import { Header, TwoButtonsBlockCustom } from './parts'

class SavedSearchModalView extends React.Component {
  render () {
    const {
      onClickOK, onClickClose,
      userOptions,
      sysSearchOptions,
      onClickRow,
      selectedSearch,
      loadingSearchOptions
    } = this.props

    const options = concat([], userOptions.map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))

    return (
      <Modal
        show
        onHide={() => {}}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Saved Search" />
        <div className="modal-body bootstrap-dialog-message">
          <div style={{maxHeight: '350px', overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Origin</th>
                </tr>
              </thead>
              <tbody>
              {options.map(p =>
                <tr key={p.id} onClick={() => onClickRow(p)} className={`${selectedSearch && selectedSearch.id === p.id ? 'selected' : ''}`}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.type}</td>
                </tr>
              )}
              {
                loadingSearchOptions && !options.length ? <tr><td colSpan="3" className="text-center">Loading...</td></tr> : null
              }
              </tbody>
            </table>
          </div>
          <TwoButtonsBlockCustom name1="Search" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}

export default SavedSearchModalView
