import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'

import {
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
      selectedGroupId, selectGroupId, onClickAddCase} = this.props

    return (
      <div className="margin-md-right" style={{width: 300}}>
        <div>
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
              <th>
                <span className="valing-middle">Test Case</span>
                <AddIcon onClick={onClickAddCase} className="link valign-middle margin-md-left"/>
              </th>
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
    return (
      <CardPanel title="Tests">
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