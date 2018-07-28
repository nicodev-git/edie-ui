import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PlayIcon from '@material-ui/icons/PlayArrow'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import RefreshOverlay from 'components/common/RefreshOverlay'
import FloatingMenu from 'components/common/floating/FloatingMenu'

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
      onClickDeleteCase, onClickPost
    } = this.props

    return (
      <div className="flex-1 margin-md-right bg-white padding-sm" style={{overflow: 'auto'}}>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {testCases.filter(p => p.groupId === selectedGroupId).map(p =>
              <tr key={p.id} className={selectedCaseId === p.id ? 'selected' : ''}
                  onClick={() => selectCaseId(p)}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <PlayIcon className="link" onClick={() => onClickPost(p)}/>
                  <DeleteIcon className="link margin-md-left" onClick={() => onClickDeleteCase(p)}/>
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
      wfSimulationState, mainMenuItems
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
          <FloatingMenu menuItems={mainMenuItems}/>
          {wfSimulationState ? <RefreshOverlay/> : null}
          {this.props.children}
        </TabPageBody>
      </TabPage>
    )
  }
}