import React from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  FormInput,
  FormSelect,
  Modal,
  CardPanel
} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'


export default class SimulationModalView extends React.Component {
  renderMessages () {
    const {allValues} = this.props
    const {testCaseId} = allValues || {}
    if (!testCaseId) return null
    return (
      <CardPanel title="Messages">

      </CardPanel>
    )
  }

  renderTestCases () {
    const {testGroups, testCases, allValues, onClickAddGroup, selectedCaseId,
      selectCaseId} = this.props
    const {groupId} = allValues || {}

    return (
      <div style={{width: 300}}>
        <div>
          <Field name="groupId"
                 component={FormSelect}
                 floatingLabel="Test Group"
                 options={testGroups.map(p => ({label: p.name, value: p.id}))}
                 style={{minWidth: 200}}
                 className="valign-middle"
          />
          <AddIcon onClick={onClickAddGroup} className="link valign-middle margin-sm-top"/>
        </div>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Test Case</th>
            </tr>
            </thead>
            <tbody>
            {testCases.filter(p => p.groupId === groupId).map(p =>
              <tr key={p.id} className={selectedCaseId === p.id ? 'selected' : ''}
                  onClick={() => selectCaseId(p.id)}>
                <td>{p.name}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderContent () {
    const { onClickAddCase } = this.props
    return (
      <CardPanel title="Tests" tools={<AddIcon onClick={onClickAddCase} className="link"/>}>
        <div className="flex-horizontal">
          {this.renderTestCases()}
          <div className="flex-1">
          </div>
        </div>
      </CardPanel>
    )
  }

  render () {
    const {onClickClose, wfSimulationState} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onClickClose} contentStyle={{width: 1000}}>
        {this.renderContent()}
        {this.renderMessages()}
        {wfSimulationState ? <RefreshOverlay/> : null}
        {this.props.children}
      </Modal>
    )
  }
}