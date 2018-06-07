import React from 'react'
import moment from 'moment'
import SortableTree from 'react-sortable-tree'
import {assign, concat, debounce, findIndex} from 'lodash'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Create'
import FilterIcon from '@material-ui/icons/FilterList'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import ToggleStar from '@material-ui/icons/StarBorder'
import {IconButton, TextField, Popover} from '@material-ui/core'
import ReactToolTip from 'react-tooltip'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {getRanges} from 'components/common/DateRangePicker'
import LogPapers from 'components/dashboard/log/LogPapers'
import {showPrompt, showConfirm} from 'components/common/Alert'
import LogFiltersModal from './LogFiltersModal'
import {hasPermission} from 'shared/Permission'
import {getAgentStatus} from 'util/Device'
import MonitorWizardContainer from 'containers/shared/wizard/MonitorWizardContainer'
import DetailLogModal from 'components/dashboard/log/DetailLogModal'
import {anyFieldKey} from 'shared/Global'

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
      search: '',
      searchValue: '',
      data: [],
      draggingUid: '',
      draggingFolderId: '',
      filterMenuOpen: false,
      anchorEl: null,

      selectedMonitorParam: false,
      openMonitorParam: false
    }

    this.tooltipRebuild = debounce(ReactToolTip.rebuild, 150)
  }
  componentWillMount () {
    this.props.fetchDevices()
    this.props.fetchMonitorGroups()
    this.props.fetchMonitorTemplates()
    this.props.fetchCollectors()
    this.startTimer()
  }

  componentDidUpdate (prevProps) {
    // const {allDevices} = this.props
    const {selectedMonitorParam, monitorTreeData, openMonitorParam} = this.state
    const {monitorId} = this.props.match.params
    if (!this.state.draggingUid && JSON.stringify(this.getLogMonitors(prevProps)) !== JSON.stringify(this.getLogMonitors())) {
    // if (prevProps.allDevices !== allDevices) {
      this.setState({
        monitorTreeData: this.getTreeData(true)
      })
      console.log('-----Tree updated-----')
    }

    if (monitorId) {
      if (!selectedMonitorParam) {
        this.setState({
          monitorUid: monitorId,
          selectedMonitorParam: true
        })
      }

      if (monitorTreeData && !openMonitorParam) {
        const filtered = monitorTreeData.filter(p => p.children.filter(u => u.uid === monitorId).length > 0)
        if (filtered.length > 0) {
          this.setState({
            monitorTreeData: monitorTreeData.map(p => p.id === filtered[0].id ? {
              ...p,
              expanded: true
            } : p),
            openMonitorParam: true
          })
        }
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer () {
    this.timer = setInterval(() => {
      this.props.fetchDevices(req => {
        this.lastReq = req
      })
    }, 20000)
    console.log('---Timer started---')
  }

  stopTimer () {
    this.lastReq && this.lastReq.cancel('Stop timer')
    this.lastReq = null
    clearInterval(this.timer)
    console.log('---Timer stopped---')
  }

  getTreeData (force) {
    let data = this.state.monitorTreeData

    if (!data || force) {
      const {draggingUid} = this.state
      const folders = this.getFolders()
      const monitors = this.getLogMonitors()

      data = folders.map(p => {
        let children = []
        if (p.id === 'root') {
          children = monitors.filter(m => folders.filter(f => f.monitorids && f.monitorids.includes(m.uid)).length === 0)
        } else {
          p.monitorids.forEach(uid => {
            const index = findIndex(monitors, {uid})
            if (index >= 0) children.push(monitors[index])
          })
        }
        if (draggingUid) {
          children = children.filter(m => m.uid !== draggingUid)
        }

        let existing = {}
        if (force && data) {
          const index = findIndex(data, {id: p.id})
          if (index >= 0) existing = data[index]
        }

        return {
          ...existing,
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

  getLogMonitors (props) {
    const {allDevices} = props || this.props
    const monitors = []
    allDevices.forEach(p => {
      if (!p.monitors) return
      p.monitors.forEach(m => {
        if (m.monitortype === 'logfile') monitors.push({
          uid: m.uid,
          name: m.name,
          lastsuccess: m.lastsuccess,
          params: m.params
        })
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

  getDeviceByMonitor(monitorUid) {
    const {allDevices} = this.props
    let device = null
    allDevices.forEach(p => {
      if (!p.monitors) return
      p.monitors.forEach(m => {
        if (m.uid === monitorUid) device = p
      })
    })

    return device
  }

  onClickMonitor (monitor) {
    this.setState({
      monitorUid: monitor.uid
    })
  }

  getParams () {
    const {monitorUid, search} = this.state

    const queries = []
    queries.push(`(monitorid:${monitorUid})`)
    if (search) {
      queries.push(`(${anyFieldKey}:"${search}")`)
    }

    return {
      q: queries.join(' AND '),
      from,
      to,
      types: 'event',
      sortBy: 'sequencer'
    }
  }

  onClickDetailView (row) {
    const {data, monitorUid, search} = this.state
    const index = search ? findIndex(data, {id: row.id}) : 0

    const params = {
      query: {
        q: `(monitorid:${monitorUid})`,
        page: 0,
        size: 100,
        types: 'event',
      },
      data: search ? data : [row],
      index
    }

    this.props.showDetailLogModal(true, params)
  }

  onResultCountUpdate (total, data) {
    this.setState({
      data
    })
  }

  onClickFixDevice () {

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
    showPrompt(`Selected Folder: ${monitorGroups[index].name}`, monitorGroups[index].name, text => {
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

  onClickRemoveFolder () {
    const {selectedFolder} = this.state
    if (!selectedFolder) return
    const {monitorGroups} = this.props
    const index = findIndex(monitorGroups, {id: selectedFolder})
    if (index < 0) return

    showConfirm(`Click OK to remove. Selected: ${monitorGroups[index].name}`, btn => {
      if (btn !== 'ok') return
      this.props.removeMonitorGroup(monitorGroups[index])

      const monitorTreeData = []

      this.getTreeData().forEach(p => {
        if (p.id === selectedFolder) {
          monitorTreeData[0].children = [...monitorTreeData[0].children, ...p.children]
        } else {
          monitorTreeData.push(p)
        }
      })

      this.setState({
        monitorTreeData
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
    const childIndex = path[1] - path[0] - 1
    while(left > 0) {
      left -= 1
      if (treeData[parentIndex].expanded)
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

    const items = []
    if (found.length) {
      console.log(`Remove from: ${found[0].name}`)
      items.push({
        ...found[0],
        monitorids: found[0].monitorids.filter(p => p !== monitorUid)
      })
    }

    //Add
    const index = findIndex(folders, {id: groupId})
    if (index >= 0) {
      let group = folders[index]
      if (group.id !== 'root') {
        if (items.length && items[0].id === group.id) {
          group = items[0]
          items.splice(0, 1)
        }
        let monitorids = group.monitorids || []
        monitorids = monitorids.filter(p => p !== 'true' && p !== 'false')
        monitorids.splice(childIndex, 0, monitorUid)
        items.push({
          ...group,
          monitorids
        })
      }
      console.log(`Append to: ${group.name}`)
    }

    this.props.updateMonitorGroups(items)
  }

  onClickFolder (folder) {
    this.setState({
      selectedFolder: folder.id
    })
  }

  onDragStateChanged ({isDragging, draggedNode}) {
    console.log(`Dragging: ${isDragging}`)
    if (isDragging) {
      this.stopTimer()
      this.setState({
        draggingUid: draggedNode.uid,
        draggingFolderId: ''
      })
    } else {
      this.startTimer()
      this.setState({
        draggingUid: '',
      })
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////

  onClickEditMonitor () {
    const {monitorUid} = this.state
    const device = this.getDeviceByMonitor(monitorUid)
    if (!device) return

    const index = findIndex(device.monitors, {uid: monitorUid})
    const monitor = device.monitors[index]

    const {monitorTemplates} = this.props

    let monitorConfig = monitorTemplates.filter(p => p.monitortype === monitor.monitortype)
    monitorConfig = monitorConfig.length ? monitorConfig[0] : null

    this.props.openDevice(device)
    this.setState({
      editMonitor: monitor,
      editDevice: device,
      monitorConfig
    }, () => {
      this.props.openDeviceMonitorWizard(monitor, monitorConfig)
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////

  onOpenFilterMenu (e) {
    this.setState({
      filterMenuOpen: true,
      anchorEl: e.target
    })
  }

  onCloseFilterMenu () {
    this.setState({
      filterMenuOpen: false
    })
  }

  onClickAddFilter () {
    const {monitorUid} = this.state
    const text = this.getSelectionText()
    if (!text) return

    const device = this.getDeviceByMonitor(monitorUid)
    if (!device) return

    let monitor = device.monitors[findIndex(device.monitors, {uid: monitorUid})]

    showConfirm(`Click OK to add ignore filter. Text: ${text}`, btn => {
      if (btn !== 'ok') return

      let filters = (monitor.params || {}).ignore_view_filters || []
      filters = [...filters, `.*${text}.*`]

      monitor.params = monitor.params || {}
      monitor = {
        ...monitor,
        params: {
          ...monitor.params,
          ignore_view_filters: filters
        }
      }

      this.props.updateMapDevice({
        ...device,
        monitors: device.monitors.map(p => p.uid === monitor.uid ? monitor : p)
      })
    })
    // const {keyword} = this.state
    // if (!keyword) return showAlert('Please type keyword')
    // this.props.addLogFilter({
    //   keyword
    // })
  }

  getSelectionText() {
    let text = ""
    const activeEl = document.activeElement
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null
    if (((activeElTagName === "textarea") || (activeElTagName === "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type))) &&
      (typeof activeEl.selectionStart === "number")) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd)
    } else if (window.getSelection) {
      text = window.getSelection().toString()
    }
    return text
  }

  onClickRemoveFilter (keyword) {
    const {monitorUid} = this.state
    const device = this.getDeviceByMonitor(monitorUid)
    if (!device) return null
    let monitor = device.monitors[findIndex(device.monitors, {uid: monitorUid})]
    if (!monitor) return null

    showConfirm('Click OK to remove.', btn => {
      if (btn !== 'ok') return

      const filters = (monitor.params || {}).ignore_view_filters || []

      monitor.params = monitor.params || {}
      monitor = {
        ...monitor,
        params: {
          ...monitor.params,
          ignore_view_filters: filters.filter(p => p !== keyword)
        }
      }

      this.props.updateMapDevice({
        ...device,
        monitors: device.monitors.map(p => p.uid === monitor.uid ? monitor : p)
      })
    })

  }

  getIgnoreFilters () {
    const {monitorUid} = this.state
    if (!monitorUid) return []
    const device = this.getDeviceByMonitor(monitorUid)
    if (!device) return []
    const monitor = device.monitors[findIndex(device.monitors, {uid: monitorUid})]
    if (!monitor) return []

    const params = monitor.params || {}
    const filters = params.ignore_view_filters || []

    return filters
  }

  ///////////////////////////////////////////////////////////////////////////////////

  onChangeSearchValue (e) {
    this.setState({
      searchValue: e.target.value
    })
  }

  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      this.setState({
        search: this.state.searchValue
      })
    }
  }

  onClickFiltersModal () {
    this.props.showLogFiltersModal(true)
  }

  onCloseFiltersModal () {
    this.props.showLogFiltersModal(false)
  }

  onClickSavedSearch (filter) {
    this.setState({
      search: filter.keyword,
      searchValue: filter.keyword
    })
    this.onCloseFiltersModal()
  }

  ///////////////////////////////////////////////////////////////////////////////////

  onFinishMonitorWizard (res, params) {
    let editMonitor = this.state.editMonitor
    let device = assign({}, this.state.editDevice)
    let monitor = assign({}, editMonitor, params)

    if (editMonitor) {
      // Edit
      const index = findIndex(device.monitors, {uid: editMonitor.uid})
      if (index >= 0) device.monitors[index] = monitor
    } else {
      // Add

      const {monitorConfig} = this.state
      assign(monitor, {
        monitortype: monitorConfig.monitortype
      })

      device.monitors = concat(device.monitors || [], monitor)
    }

    this.props.updateMapDevice(device)
    this.props.closeDeviceMonitorWizard()
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
    const {collectors} = this.props
    let time = ''
    if (m.lastsuccess) {
      time = moment(m.lastsuccess).fromNow()
        .replace(' ago', '')
        .replace(' minutes', 'm')
        .replace(' hours', 'h')
        .replace(' days', 'd')
        .replace('a day', '1d')
    }

    const device = this.getDeviceByMonitor(m.uid)
    const up = getAgentStatus(device)

    let tip = ''
    if (!up) {
      if (device.agentType === 'collector') {
        const index = findIndex(collectors, {id: device.collectorId})
        if (index < 0) {
          tip = `Collector not found.`
        } else {
          const collectorUp = (new Date().getTime() - collectors[index].lastSeen) < 3 * 60 * 1000
          tip = `Collector ${collectors[index].name} is ${collectorUp ? 'up' : 'down'}. <br/>`
          if (collectorUp) {
            tip = `${tip} Server ${device.name} IP ${device.wanip} is down.`
          }
        }
      } else {
        const {agent} = device
        if (!agent) {
          tip = `Agent not installed.`
        } else {
          const agentUp = (new Date().getTime() - agent.lastSeen) < 3 * 60 * 1000
          tip = `Agent is ${agentUp ? 'up' : 'down'}. <br/>`
          if (agentUp) {
            tip = `${tip} Server ${device.name} IP ${device.wanip} is down.`
          }
        }
      }

      this.tooltipRebuild()
    }
    return (
      <span className="link">
        <span className="valign-middle" onClick={this.onClickMonitor.bind(this, m)}>
        <img src="/resources/images/dashboard/file.png" width="20" alt=""
                 className="valign-middle"/>&nbsp;
        {m.name}{time ? ` (${time})` : ''}&nbsp;
        </span>
        {!up && <img src="/resources/images/log/down.png" width="16" alt="Device not working"
             className="valign-middle" data-tip={tip} data-html
                     onClick={this.onClickFixDevice.bind(this, device)}/>}&nbsp;
        <img src="/resources/images/log/hdd.png" width="16" alt="" data-tip={(m.params || {}).filepath || ''}
             className="valign-middle"/>
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
        rowHeight={20}
        className="logs"
        onDragStateChanged={this.onDragStateChanged.bind(this)}
      />
    )
  }

  renderLogs (filters) {
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
        showRenew
        ignoreFilters={filters}
      />
    )
  }

  renderLogTools () {
    return (
      <div style={{position: 'absolute', right: 5, top: 8}}>
        <AddCircleIcon className="link" onClick={this.onClickAddFolder.bind(this)}/>
        <EditIcon className="link" onClick={this.onClickEditFolder.bind(this)}/>
        <DeleteIcon className="link" onClick={this.onClickRemoveFolder.bind(this)}/>
      </div>
    )
  }

  renderSearchTools (filters, canEdit) {
    return (
      <div style={{position: 'absolute', right: 5, top: 5}} className="form-inline">
        <div className="valign-middle inline-block margin-md-left margin-md-right">
          {canEdit && <EditIcon className="link" onClick={this.onClickEditMonitor.bind(this)}/>}
          {canEdit && <FilterIcon className="link" onClick={this.onClickAddFilter.bind(this)}/>}
          {canEdit && <MoreVertIcon className="link" onClick={this.onOpenFilterMenu.bind(this)}/>}

          <Popover
            open={this.state.filterMenuOpen}
            onClose={this.onCloseFilterMenu.bind(this)}
            anchorEl={this.state.anchorEl}
          >
            {filters.map((p, i) =>
              <div key={i} className="padding-sm nowrap">
                {p}
                <DeleteIcon className="link pull-right" onClick={this.onClickRemoveFilter.bind(this, p)} />
              </div>
            )}
          </Popover>
        </div>
      </div>
    )
  }

  renderLogFiltersModal (canEdit) {
    if (!this.props.logFiltersModalOpen) return null
    return (
      <LogFiltersModal
        {...this.props}
        keyword={this.state.searchValue}
        onHide={this.onCloseFiltersModal.bind(this)}
        onClickSearch={this.onClickSavedSearch.bind(this)}
        canEdit={canEdit}
      />
    )
  }

  renderMonitorWizard () {
    if (!this.props.monitorWizardVisible) return null

    const {monitorConfig} = this.state
    const type = 'monitor-custom'
    return (
      <MonitorWizardContainer
        deviceType={type}
        title={`Edit ${monitorConfig ? monitorConfig.name : ''} Monitor`}
        onClose={() => {
          this.props.closeDeviceMonitorWizard()
        }}
        extraParams={{}}
        configParams={{}}
        onFinish={this.onFinishMonitorWizard.bind(this)}
      />
    )
  }

  renderDetailModal () {
    if (!this.props.detailLogModalOpen) return null
    return (
      <DetailLogModal
        {...this.props}
        revertRows
      />
    )
  }

  render () {
    const {userInfo} = this.props
    const filters = this.getIgnoreFilters()

    const canEdit = hasPermission(userInfo, 'EditLogs')
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <div>
            <span className="tab-title">Logs</span>
          </div>
          <div className="text-center relative" style={{background: 'rgb(218, 218, 218)'}}>
            <div className="inline-block">
              <TextField name="search" value={this.state.searchValue}
                         onChange={this.onChangeSearchValue.bind(this)} label="Search..."
                         onKeyDown={this.onSearchKeyDown.bind(this)}/>
            </div>

           <div style={{position: 'absolute', right: 10, top: 2}}>
             <IconButton onClick={this.onClickFiltersModal.bind(this)}><ToggleStar/></IconButton>
           </div>
          </div>
        </div>


        <TabPageBody history={this.props.history} location={this.props.location} transparent>
          <div className="flex-horizontal flex-1" style={{height: '100%', overflow: 'hidden'}}>
            <div className="flex-vertical" style={{minWidth: 300, marginRight: 5}}>
              <div className="header-blue relative margin-xs-right">
                Log
                {canEdit && this.renderLogTools()}
              </div>
              <div className="flex-1 paper-bg">
                {this.renderFolderTree()}
              </div>
            </div>
            <div className="flex-vertical flex-1">
              <div className="header-red margin-xs-right">
                Content
                {this.renderSearchTools(filters, canEdit)}
              </div>
              <div className="flex-1 flex-vertical paper-bg">
                {this.renderLogs(filters)}
              </div>
            </div>
          </div>
          {this.renderLogFiltersModal(canEdit)}
          {this.renderMonitorWizard()}
          {this.renderDetailModal()}
          <ReactToolTip/>
        </TabPageBody>
      </TabPage>
    )
  }
}
