import React from 'react'
import moment from 'moment'
import {RaisedButton} from 'material-ui'
import SortableTree from 'react-sortable-tree'
// import FileTheme from 'react-sortable-tree-theme-file-explorer'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import {getRanges} from 'components/common/DateRangePicker'
import LogPapers from 'components/dashboard/log/LogPapers'
import {showPrompt} from 'components/common/Alert'

const ranges = getRanges()
const from = ranges['Ever'][0].valueOf()
const to = ranges['Ever'][1].valueOf()

const logSort = (a, b) => {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
}
export default class Log extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      monitorUid: '',
      monitorTreeData: null
    }
  }
  componentWillMount () {
    this.props.fetchDevicesGroups()
    this.props.fetchMonitorGroups()
  }
  getLogMonitors () {
    const {allDevices} = this.props
    const monitors = []
    allDevices.forEach(p => {
      if (!p.monitors) return
      p.monitors.forEach(m => {
        if (m.monitortype === 'logfile') monitors.push(m)
      })
    })

    monitors.sort(logSort)

    return monitors
  }

  getFolders () {
    const {monitorGroups} = this.props
    const filtered = monitorGroups.filter(p => p.type === 'folder')

    const list = [{
      id: 'root',
      name: 'All'
    }, ...filtered]
    return list
  }

  onClickMonitor (monitor) {
    this.setState({
      monitorUid: monitor.uid
    })
  }

  getParams () {
    const {monitorUid} = this.state

    const queries = []
    queries.push(`(monitorid:${monitorUid})`)

    return {
      q: queries.join(' AND '),
      from,
      to,
      types: 'event'
    }
  }

  onClickDetailView () {

  }

  onResultCountUpdate () {

  }

  ///////////////////////////////////////////////////////////////////////////////////

  onClickAddFolder () {
    showPrompt('Folder Name', '', text => {
      if (!text) return
      this.props.addMonitorGroup({
        name: text,
        monitorids: [],
        status: 'UNKNOWN',
        userIds: [],
        tags: [],
        type: 'folder'
      })
    })
  }

  onChangeTreeData (monitorTreeData) {
    this.setState({monitorTreeData})
  }

  canDragObject ({node}) {
    return !!node.uid
  }
  canDropObject (args) {
    const {nextParent} = args
    console.log(args)
    return nextParent && !!nextParent.id
  }
  ///////////////////////////////////////////////////////////////////////////////////
  renderFolder (p) {
    return (
      <span className="link">
            <img src="/resources/images/dashboard/folder.png" width="20" alt="" className="valign-middle"/>
        &nbsp;{p.name}
      </span>
    )
  }
  renderMonitor(m) {
    let time = ''
    if (m.lastsuccess) {
      time = moment(m.lastsuccess).fromNow().replace(' ago', '')
    }

    return (
      <span className="link" onClick={this.onClickMonitor.bind(this, m)}>
            <img src="/resources/images/dashboard/file.png" width="20" alt=""
                 className="valign-middle"/>
        &nbsp;{m.name}{time ? ` (${time})` : ''}
      </span>
    )
  }

  renderFolderTree () {
    let data = this.state.monitorTreeData
    if (!data) {
      const folders = this.getFolders()
      const monitors = this.getLogMonitors()

      data = folders.map(p => {
        let children = []
        if (p.id === 'root') {
          children = monitors.filter(m => folders.filter(f => f.monitorids && f.monitorids.includes(m.uid)).length === 0)
        } else {
          children = monitors.filter(m => p.monitorids && p.monitorids.includes(m.uid))
        }

        return {
          id: p.id,
          title: this.renderFolder.bind(this, p),
          children: children.map(c => ({
            uid: c.uid,
            title: this.renderMonitor.bind(this, c)
          }))
        }
      })
    }

    return (
      <SortableTree
        treeData={data}
        onChange={this.onChangeTreeData.bind(this)}
        canDrag={this.canDragObject.bind(this)}
        canDrop={this.canDropObject.bind(this)}
        scaffoldBlockPxWidth={20}
        rowHeight={24}
        className="logs"
      />
    )
  }

  // renderFolders () {
  //   const folders = this.getFolders()
  //
  //   const monitors = this.getLogMonitors()
  //   return folders.map(p =>{
  //     let files = []
  //     if (p.id === 'root') {
  //       files = monitors.filter(m => folders.filter(f => f.monitorids && f.monitorids.includes(m.uid)).length === 0)
  //     } else {
  //       files = monitors.filter(m => p.monitorids && p.monitorids.includes(m.uid))
  //     }
  //
  //     return [
  //       <div key={p.id} className="padding-sm bt-gray">
  //         <span className="link">
  //           <img src="/resources/images/dashboard/folder.png" width="16" alt="" className="valign-middle"/>
  //           &nbsp;{p.name}
  //         </span>
  //       </div>,
  //       ...this.renderMonitorList(files)
  //     ]
  //   })
  // }
  // renderMonitorList (monitors) {
  //   return monitors.map(m => {
  //     let time = ''
  //     if (m.lastsuccess) {
  //       time = moment(m.lastsuccess).fromNow().replace(' ago', '')
  //     }
  //     return (
  //       <div key={m.uid} className="padding-sm bt-gray">
  //         <span className="link" onClick={this.onClickMonitor.bind(this, m)}>
  //           <img src="/resources/images/dashboard/file.png" width="16" alt=""
  //                className="valign-middle margin-sm-left"/>
  //           &nbsp;{m.name}{time ? ` (${time})` : ''}
  //         </span>
  //       </div>
  //     )
  //   })
  // }

  renderLogs () {
    const {monitorUid} = this.state
    if (!monitorUid) return <div/>
    return (
      <div className="flex-1 flex-vertical">
        <LogPapers
          url="/search/query"
          ref="table"
          rowMetadata={{'key': 'id'}}
          params={this.getParams()}
          pageSize={500}
          revertRows
          onClickView={this.onClickDetailView.bind(this)}
          onUpdateCount={this.onResultCountUpdate.bind(this)}
          reversePage
          noCard
        />
      </div>
    )
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Logs">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onClickAddFolder.bind(this)}/>&nbsp;
              <RaisedButton label="Edit"/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div style={{minWidth: 300}}>
              <div className="header-blue">Log</div>
              {this.renderFolderTree()}
            </div>
            <div>
              &nbsp;&nbsp;
            </div>
            <div className="flex-vertical flex-1" style={{overflow: 'auto'}}>
              <div className="header-red">Content</div>
              {this.renderLogs()}
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
