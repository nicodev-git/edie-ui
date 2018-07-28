import React from 'react'
import {Select, MenuItem, InputLabel, FormControl, Button} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import {
  CardPanel
} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'


export default class WfTestView extends React.Component {
  renderMessages () {
    const {caseModal} = this.props
    return (
      <div className="flex-1" style={{minHeight: 300}}>
        {caseModal}
      </div>
    )
  }

  renderTestCases () {
    const {testGroups, testCases,
      onClickAddGroup, onClickEditGroup,
      selectedCaseId, selectCaseId,
      selectedGroupId, selectGroupId,
      onClickAddCase, onClickDeleteCase} = this.props

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
          <EditIcon onClick={onClickEditGroup} className="link valign-middle margin-sm-top"/>
        </div>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>
                <span className="valing-middle">Test Case</span>
                <AddIcon onClick={onClickAddCase} className="link valign-middle margin-md-left"/>
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {testCases.filter(p => p.groupId === selectedGroupId).map(p =>
              <tr key={p.id} className={selectedCaseId === p.id ? 'selected' : ''}
                  onClick={() => selectCaseId(p)}>
                <td>{p.name}</td>
                <td>
                  <DeleteIcon onClick={() => onClickDeleteCase(p)}/>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    const {wfSimulationState} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Tests">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
            </div>
            <div className="pull-right">
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>
          {this.renderTestCases()}
          {this.renderMessages()}
          {wfSimulationState ? <RefreshOverlay/> : null}
          {this.props.children}
        </TabPageBody>
      </TabPage>
    )
  }
}