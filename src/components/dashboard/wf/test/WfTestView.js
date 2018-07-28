import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import RefreshOverlay from 'components/common/RefreshOverlay'


export default class WfTestView extends React.Component {
  renderMessages () {
    const {caseModal} = this.props
    return (
      <div className="flex-1 bg-white padding-sm" style={{overflow: 'auto'}}>
        {caseModal}
      </div>
    )
  }

  renderIncidents () {
    return (
      <div className="flex-1 bg-white margin-md-top padding-sm">

      </div>
    )
  }

  renderTestCases () {
    const {
      selectedGroupId, testCases,
      selectedCaseId, selectCaseId,
      onClickAddCase, onClickDeleteCase
    } = this.props

    return (
      <div className="flex-1 margin-md-right bg-white padding-sm" style={{overflow: 'auto'}}>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>
                <span className="valing-middle">Name</span>
                <AddIcon onClick={onClickAddCase} className="link valign-middle margin-md-left"/>
              </th>
              <th>
                Description
              </th>
              <th>
              </th>
            </tr>
            </thead>
            <tbody>
            {testCases.filter(p => p.groupId === selectedGroupId).map(p =>
              <tr key={p.id} className={selectedCaseId === p.id ? 'selected' : ''}
                  onClick={() => selectCaseId(p)}>
                <td>{p.name}</td>
                <td></td>
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
    const {
      testGroups, selectedGroupId, selectGroupId,
      onClickAddGroup, onClickEditGroup,
      wfSimulationState
    } = this.props
    return (
      <TabPage>
        <TabPageHeader title="Simulation">
          <div className="margin-md-top">
            <div style={{background: '#dadada', paddingLeft: 10}}>
              <div style={{height: 60}}>
                <div className="text-left inline-block">
                  <FormControl className="valign-middle margin-sm-top" style={{minWidth: 200}}>
                    <InputLabel>Test Group</InputLabel>
                    <Select displayEmpty value={selectedGroupId || ''} onChange={selectGroupId}>
                      {testGroups.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
                <div className="pull-right margin-md-top margin-md-right">
                  <AddIcon onClick={onClickAddGroup} className="link valign-middle margin-sm-top"/>
                  <EditIcon onClick={onClickEditGroup} className="link valign-middle margin-sm-top"/>
                </div>
              </div>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location} transparent>
          <div className="flex-1 flex-vertical padding-sm" style={{height: '100%'}}>
            <div className="flex-1 flex-horizontal">
              {this.renderTestCases()}
              {this.renderMessages()}
            </div>
            {this.renderIncidents()}
          </div>
          {wfSimulationState ? <RefreshOverlay/> : null}
          {this.props.children}
        </TabPageBody>
      </TabPage>
    )
  }
}