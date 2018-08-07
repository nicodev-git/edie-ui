import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PlayIcon from '@material-ui/icons/PlayArrow'
import RefreshIcon from '@material-ui/icons/Refresh'
import moment from 'moment'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import RefreshOverlay from 'components/common/RefreshOverlay'
import FloatingMenu from 'components/common/floating/FloatingMenu'

import { getSeverityIcon } from 'shared/Global'
import InfiniteTable from 'components/common/InfiniteTable'

import { thumbup, thumpdown, done, notdone,
  rawtext, reason } from 'style/common/materialStyles'


export default class WfTestView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span>{getSeverityIcon(props.data)}</span> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-180',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
          <span>
            {moment(new Date(data)).fromNow()}
          </span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'devicename',
      'cssClassName': 'width-200',
      'customComponent': p => {
        const {workflow} = p.rowData
        return <span>{p.data}{workflow ? `(${workflow})` : ''}</span>
      }
    }, {
      'displayName': 'Description',
      'columnName': 'description',
      'weight': 1
    }, {
      'displayName': 'Actions',
      'columnName': 'actions',
      'cssClassName': 'width-180',
      'customComponent': (p) => {
        const row = p.rowData
        return (
          <div className = "table-icons-container">
            <div onClick={() => this.ackIncident(row)}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>

            <div onClick={() => this.onClickFixIncident(row)}>
              {row.fixed ? done : notdone}
            </div>

            <div onClick={this.onClickViewRaw.bind(this, row)}>
              {rawtext}
            </div>

            {
              (row.fixed && !row.whathappened)
                ? <div onClick={this.showIncidentComments.bind(this, row)}>
                  {reason}
                </div>
                : null
            }

          </div>
        )
      }
    }]
  }
  ackIncident () {

  }
  onClickFixIncident () {

  }
  onClickViewRaw () {

  }
  showIncidentComments () {

  }


  renderMessages () {
    const {caseModal} = this.props
    return (
      <div className="flex-1 bg-white" style={{overflow: 'auto'}}>
        {caseModal}
      </div>
    )
  }

  // renderIncidents () {
  //   const {testIncidents} = this.props
  //   return (
  //     <div className="flex-1 bg-white margin-md-top padding-sm" style={{overflow: 'auto'}}>
  //       <table className="table table-hover">
  //         <thead>
  //           <tr>
  //             <th>Severity</th>
  //             <th>Date/Time</th>
  //             <th>System</th>
  //             <th>Description</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //         {testIncidents.map(p =>
  //           <tr key={p.id}>
  //             <td>{getSeverityIcon(p.severity, 24)}</td>
  //             <td>
  //               {moment(new Date(p.startTimestamp)).fromNow()}
  //             </td>
  //             <td>{p.monitorName}</td>
  //             <td>{p.description}</td>
  //           </tr>
  //         )}
  //         </tbody>
  //       </table>
  //     </div>
  //   )
  // }

  renderIncidents () {
    const {incidentDraw} = this.props
    return (
      <div className="flex-1 bg-white margin-md-top">
        <InfiniteTable
          url="/incident/search/findBySimulation"
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          params={{
            draw: incidentDraw,
            sort: 'startTimestamp,desc',
            size: 10
          }}
        />
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
                  onClick={e => selectCaseId(p, e)}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <PlayIcon className="link" onClick={() => onClickPost(p)}/>
                  <DeleteIcon className="link margin-md-left" onClick={e => onClickDeleteCase(p, e)}/>
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
      onClickAddGroup, onClickEditGroup, onClickDeleteGroup,
      wfSimulationState, mainMenuItems, onClickRefreshIncidents
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
                  <DeleteIcon onClick={onClickDeleteGroup} className="link valign-middle margin-sm-top"/>
                </div>

                <div className="pull-right">
                  <RefreshIcon className="link margin-md-top margin-md-right" onClick={onClickRefreshIncidents}/>
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