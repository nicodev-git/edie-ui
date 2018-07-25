import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
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
    const {caseModal} = this.props
    return (
      <div className="flex-1">
        {caseModal}
      </div>
    )
  }

  renderTestCases () {
    const {testGroups, testCases, onClickAddGroup, selectedCaseId, selectCaseId,
      selectedGroupId, selectGroupId} = this.props

    return (
      <div style={{width: 300}}>
        <div className="margin-md-right">
          <FormControl className="valign-middle" style={{minWidth: 200}}>
            <InputLabel>Test Group</InputLabel>
            <Select displayEmpty value={selectedGroupId || ''} onChange={selectGroupId}>
              {testGroups.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </Select>
          </FormControl>
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
            {testCases.filter(p => p.groupId === selectedGroupId).map(p =>
              <tr key={p.id} className={selectedCaseId === p.id ? 'selected' : ''}
                  onClick={() => selectCaseId(p)}>
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
          {this.renderMessages()}
        </div>
      </CardPanel>
    )
  }

  render () {
    const {onClickClose, wfSimulationState} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onClickClose} contentStyle={{width: 1000}}>
        {this.renderContent()}
        {wfSimulationState ? <RefreshOverlay/> : null}
        {this.props.children}
      </Modal>
    )
  }
}