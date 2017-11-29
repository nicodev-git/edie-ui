import React from 'react'
import moment from 'moment'
import SortableTree from 'react-sortable-tree'
import {findIndex, debounce} from 'lodash'
// import FileTheme from 'react-sortable-tree-theme-file-explorer'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import EditIcon from 'material-ui/svg-icons/content/create'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {IconMenu, IconButton, MenuItem} from 'material-ui'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {getRanges} from 'components/common/DateRangePicker'
import LogPapers from 'components/dashboard/log/LogPapers'
import {showPrompt, showAlert} from 'components/common/Alert'

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
      monitorTreeData: null,
      selectedFolder: null,
      keyword: '',
      keywordParam: ''
    }

    this.debChangeKeyword = debounce(this.changeKeyword.bind(this), 500)
  }
  componentWillMount () {
    this.props.fetchDevices()
    this.props.fetchMonitorGroups()
    this.startTimer()
  }

  componentDidUpdate (prevProps) {
    const {allDevices} = this.props
    if (prevProps.allDevices !== allDevices) {
      let data = this.state.monitorTreeData
      if (!data) return
      const monitors = this.getLogMonitors()
      data = data.map(p => ({
        ...p,
        id: p.id,
        name: p.name,
        title: p.title,
        children: p.children.map(c => {
          const index = findIndex(monitors, {uid: c.uid})
          if (index < 0) return c
          return {
            ...c,
            uid: monitors[index].uid,
            title: this.renderMonitor.bind(this, monitors[index])
          }
        })
      }))

      this.setState({
        monitorTreeData: data
      })
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer () {
    this.timer = setInterval(this.props.fetchDevices, 6000)
  }

  stopTimer () {
    clearInterval(this.timer)
  }

  getTreeData () {
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
          name: p.name,
          title: this.renderFolder.bind(this, p),
          children: children.map(c => ({
            uid: c.uid,
            title: this.renderMonitor.bind(this, c)
          }))
        }
      })
    }

    return data
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
    const {monitorUid, keywordParam} = this.state

    const queries = []
    if (keywordParam) {
      queries.push(`(_all:"${keywordParam}")`)
    }
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

  onClickEditFolder () {
    const {selectedFolder} = this.state
    if (!selectedFolder) return
    const {monitorGroups} = this.props
    const index = findIndex(monitorGroups, {id: selectedFolder})
    if (index < 0) return
    showPrompt('Folder Name', monitorGroups[index].name, text => {
      if (!text) return
      this.props.updateMonitorGroup({
        ...monitorGroups[index],
        name: text
      })

      this.setState({
        monitorTreeData: this.getTreeData().map(p => {
          if (p.id === selectedFolder) {
            const folder = {
              ...p,
              name: text
            }
            folder.title = this.renderFolder.bind(this, folder)
            return folder
          } else {
            return p
          }
        })
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
    return nextParent && !!nextParent.id
  }

  onMoveNode (args) {
    const {treeData, node, path, prevPath} = args
    if (path[0] === prevPath[0] && path[1] === prevPath[1]) return

    let parentIndex = 0
    let left = path[0]
    while(left > 0) {
      left -= 1
      left -= treeData[parentIndex].children.length
      parentIndex++
    }

    ///////////////////////////////////////////

    const groupId = treeData[parentIndex].id
    const monitorUid = node.uid
    if (!groupId || !monitorUid) return

    const folders = this.getFolders()
    //Remove
    const found = folders.filter(p => p.monitorids && p.monitorids.includes(monitorUid))
    if (found.length) {
      console.log(`Remove from: ${found[0].name}`)
      this.props.updateMonitorGroup({
        ...found[0],
        monitorids: found[0].monitorids.map(p => p !== monitorUid)
      })
    }

    //Add
    const index = findIndex(folders, {id: groupId})
    if (index >= 0) {
      const group = folders[index]
      if (group.id === 'root') return
      console.log(`Append to: ${group.name}`)
      this.props.updateMonitorGroup({
        ...group,
        monitorids: [...(group.monitorids || []), monitorUid]
      })
    }
  }

  onClickFolder (folder) {
    this.setState({
      selectedFolder: folder.id
    })
  }
  ///////////////////////////////////////////////////////////////////////////////////

  onChangeKeyword (e) {
    this.setState({keyword: e.target.value})
    this.debChangeKeyword()
  }

  changeKeyword () {
    this.setState({
      keywordParam: this.state.keyword
    })
  }

  onClickAddFilter () {
    const {keyword} = this.state
    if (!keyword) return showAlert('Please type keyword')
    this.props.addLogFilter({
      keyword
    })
  }

  onClickFilter (filter) {
    this.setState({
      keyword: filter.keyword
    })
  }
  ///////////////////////////////////////////////////////////////////////////////////
  renderFolder (p) {
    const {selectedFolder} = this.state
    const selected = selectedFolder && selectedFolder === p.id
    return (
      <span className={`link ${selected ? 'text-danger' : ''}`} onClick={this.onClickFolder.bind(this, p)}>
        <img src="/resources/images/dashboard/folder.png" width="20" alt="" className="valign-middle"/>
        &nbsp;{p.name}
      </span>
    )
  }
  renderMonitor(m) {
    let time = ''
    if (m.lastsuccess) {
      time = moment(m.lastsuccess).fromNow()
        .replace(' ago', '')
        .replace(' minutes', 'm')
        .replace(' hours', 'h')
        .replace(' days', 'd')
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
    return (
      <SortableTree
        treeData={this.getTreeData()}
        onChange={this.onChangeTreeData.bind(this)}
        canDrag={this.canDragObject.bind(this)}
        canDrop={this.canDropObject.bind(this)}
        onMoveNode={this.onMoveNode.bind(this)}
        scaffoldBlockPxWidth={20}
        rowHeight={24}
        className="logs"
      />
    )
  }

  renderLogs () {
    const {monitorUid} = this.state
    if (!monitorUid) return <div/>
    return (
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
        noSearch
        showRenew
      />
    )
  }

  renderLogTools () {
    return (
      <div style={{position: 'absolute', right: 5, top: 8}}>
        <AddCircleIcon className="link" onTouchTap={this.onClickAddFolder.bind(this)}/>
        <EditIcon className="link" onTouchTap={this.onClickEditFolder.bind(this)}/>
      </div>
    )
  }

  renderSearchTools () {
    const {keyword} = this.state
    const {logFilters} = this.props
    return (
      <div style={{position: 'absolute', right: 5, top: 8}} className="form-inline">
        <input type="text" className="form-control input-sm" placeholder="Search..." value={keyword}
               onChange={this.onChangeKeyword.bind(this)}/>
        <div className="valign-middle inline-block margin-md-left margin-md-right">
          <FilterIcon className="link" onTouchTap={this.onClickAddFilter.bind(this)}/>

          <IconMenu iconButtonElement={
            <IconButton style={{padding: 0, width: 24, height: 24}}
              iconStyle={{width: 24, height: 24}}>
              <MoreVertIcon/>
            </IconButton>}>
            {logFilters.map(p =>
              <MenuItem key={p.id} primaryText={p.keyword} onTouchTap={this.onClickFilter.bind(this, p)}/>
            )}
          </IconMenu>
        </div>
      </div>
    )
  }

  renderLogFiltersModal () {

  }

  render () {
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Logs</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location} transparent>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div className="flex-vertical" style={{minWidth: 300, marginRight: 5}}>
              <div className="header-blue relative margin-xs-right">
                Log
                {this.renderLogTools()}
              </div>
              <div className="flex-1 paper-bg">
                {this.renderFolderTree()}
              </div>
            </div>
            <div className="flex-vertical flex-1">
              <div className="header-red margin-xs-right">
                Content
                {this.renderSearchTools()}
              </div>
              <div className="flex-1 flex-vertical paper-bg">
                {this.renderLogs()}
              </div>
            </div>
          </div>
          {this.renderLogFiltersModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
