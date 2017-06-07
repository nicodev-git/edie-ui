import React from 'react'
import Modal from 'react-bootstrap-modal'
import {keys} from 'lodash'

import {Header, TwoButtonsBlockCustom} from './parts'

import {Tabs, Tab} from 'material-ui/Tabs'
import {viewFilters} from 'shared/Global'

export default class ViewFilterModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, selectViewFilter, selectedViewFilter} = this.props
    return (
      <Modal show onHide={() => {}} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
        <Header name="View Filter"/>
        <div className="modal-body bootstrap-dialog-message">
          <Tabs>
            <Tab label="Predefined">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {keys(viewFilters).map(k =>
                    <tr
                      key={k}
                      onClick={() => selectViewFilter(viewFilters[k].name)}
                      className={selectedViewFilter === viewFilters[k].name ? 'selected' : ''}>
                      <td>{viewFilters[k].name}</td>
                      <td>{viewFilters[k].desc}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Tab>
            <Tab label="Specific"/>
          </Tabs>
          <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
        </div>
      </Modal>
    )
  }
}
