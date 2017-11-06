import React from 'react'
import {concat} from 'lodash'
import {IconButton, SelectField, MenuItem, TextField} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import InfoIcon from 'material-ui/svg-icons/action/info'
import {debounce, findIndex} from 'lodash'

import WfRectModal from './workflow/WfRectModal'
import RectItem from './workflow/RectItem'

import {guid, severities, queryDateFormat, collections} from 'shared/Global'
import {showAlert, showConfirm} from 'components/common/Alert'
import RectSearchModal from './workflow/RectSearchModal'

import {buildServiceParams} from 'util/Query'
import {getRanges} from 'components/common/DateRangePicker'
import EntityDetailModal from 'components/sidebar/search/EntityDetailModal'
import WfRectGroupsModal from "./workflow/WfRectGroupsModal";

export default class WorkflowDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }
  componentWillMount () {
    this.debUpdateGroup = debounce(this.updateGroup.bind(this), 2000)
    this.props.fetchWfRectGroups()
  }

  componentDidMount () {
    const {mxUtils, mxEditor, mxEvent} = window
    const node = mxUtils.load('/resources/plugins/mxgraph/config/workfloweditor.xml').getDocumentElement();
    const editor = new mxEditor(node);
    const graph = editor.graph

    this.editor = editor

    graph.minFitScale = 1
    graph.maxFitScale = 1
    graph.autoExtend = 0
    graph.setCellsResizable(false)
    graph.setAllowDanglingEdges(false);
    // graph.maximumGraphBounds = new window.mxRectangle(0, 0, 1024, 768)
    // const graph = new window.mxGraph(document.getElementById('graphContainer'))
    editor.setMode('connect')

    // const style = graph.getStylesheet().getDefaultEdgeStyle()
    // style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation

    // Enables rubberband selection
    new window.mxRubberband(graph)

    //Register styles
    this.registerGraphStyles(graph)

    /////////////////////////

    graph.addListener(mxEvent.CELLS_MOVED, (sender, evt) => {
      evt.properties.cells.forEach(v => {
        if (!v.userData) return
        const {id} = v.userData
        // console.log(v)

        let rect = this.findRect(id)
        if (!rect) return


        rect = {
          ...rect,
          map: {
            ...(rect.map || {}),
            x: v.geometry.x,
            y: v.geometry.y
          }
        }

        console.log(rect)

        this.props.updateGaugeRect(rect, this.props.selectedWfRectGroup, true)
        this.debUpdateGroup()
      })
    })

    /////////////////////////

    graph.addListener(mxEvent.CELL_CONNECTED, (sender, evt) => {
      const {edge, source} = evt.properties
      if (source || !edge.source || !edge.target) return
      const sourceId = edge.source.userData.id
      const destId = edge.target.userData.id

      graph.getModel().setValue(edge, '')

      let sourceRect = this.findRect(sourceId)
      if (!sourceRect) {
        console.log(`Rect not found: ${sourceId}`)
        return
      }
      sourceRect.map = sourceRect.map || {}
      sourceRect.map.lines = sourceRect.map.lines || []
      const existing = findIndex(sourceRect.map.lines, {id: destId})
      if (existing >= 0) {
        console.log('Already connected')
        return
      }

      sourceRect = {
        ...sourceRect,
        map: {
          ...sourceRect.map,
          lines: [...sourceRect.map.lines, {
            id: destId
          }]
        }
      }

      console.log(sourceRect)
      this.props.updateGaugeRect(sourceRect, this.props.selectedWfRectGroup, true)
      this.debUpdateGroup()
    })

    ///////////////////////////

    graph.addListener(mxEvent.CLICK, (sender, evt) => {
      const e = evt.getProperty('event'); // mouse event
      const cell = evt.getProperty('cell'); // cell may be null

      if (cell != null && e.currentTarget.textContent) {
        if (cell.userData) {
          evt.consume();
          const rect = this.findRect(cell.userData.id)
          const style = graph.getModel().getStyle(cell)
          if (style === 'box-gray') return

          this.onClickShowSearch(rect, style === 'box-green')
        }
      }
    })

  }

  componentDidUpdate (prevProps) {
    const prevRects = prevProps.selectedWfRectGroup ? (prevProps.selectedWfRectGroup.rects || []) : []
    const rects = this.getRects()
    const check = this.needUpdateRects(prevRects, rects)
    if (check.result) {
      console.log(`Change detected. Added: ${check.added.length} Updated: ${check.updated.length} Removed: ${check.removed.length}`)
      this.addGraphRects(check.added)
      this.updateGraphRects(check.updated)
      this.removeGraphRects(check.removed)
    }

    const {wfRectGroups, selectedWfRectGroup} = this.props
    if (prevProps.wfRectGroups !== wfRectGroups) {
      if (!selectedWfRectGroup || findIndex(wfRectGroups, {id: selectedWfRectGroup.id}) < 0) {
        this.props.selectWfRectGroup(wfRectGroups.length > 0 ? wfRectGroups[0] : null)
      }
    }

    if (selectedWfRectGroup && (!prevProps.selectedWfRectGroup ||
        prevProps.selectedWfRectGroup.id !== selectedWfRectGroup.id)) {
      this.loadGroup(selectedWfRectGroup)
    }
  }

  registerGraphStyles (graph) {
    const {mxConstants} = window
    let style = {}
    style[mxConstants.STYLE_SHAPE] = 'wfRect'
    style[mxConstants.STYLE_FONTCOLOR] = '#ffffff'
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'transparent'
    style[mxConstants.STYLE_FONTSIZE] = '15'
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD
    style[mxConstants.STYLE_ROUNDED] = 1
    style[mxConstants.STYLE_ARCSIZE] = 6
    style[mxConstants.STYLE_STROKECOLOR] = '#D1282C'
    style[mxConstants.STYLE_FILLCOLOR] = '#D1282C'

    graph.getStylesheet().putCellStyle('box-red', style)

    style = {
      ...style,
      [mxConstants.STYLE_STROKECOLOR]: '#3cba54',
      [mxConstants.STYLE_FILLCOLOR]: '#3cba54'
    }

    graph.getStylesheet().putCellStyle('box-green', style)

    style = {
      ...style,
      [mxConstants.STYLE_STROKECOLOR]: 'gray',
      [mxConstants.STYLE_FILLCOLOR]: 'gray'
    }

    graph.getStylesheet().putCellStyle('box-gray', style)
  }

  needUpdateRects(prevRects, rects) {
    const added = []
    const updated = []
    const removed = prevRects.filter(p => rects.filter(n => n.id === p.id).length === 0)

    rects.forEach(n => {
      const found = prevRects.filter(p => p.id === n.id)
      if (found.length) {
        const p = found[0]
        if (this.isRectDifferent(n, p)) {
          updated.push(n)
        }
      } else {
        added.push(n)
      }
    })

    return {
      result: (added.length + updated.length + removed.length) > 0,
      added, updated, removed
    }
  }

  isRectDifferent (n, p) {
    if (JSON.stringify(n) !== JSON.stringify(p)) return true
    return false
  }

  ///////////////////////////////////////////

  loadGroup (group) {
    this.clearGraph()
    // Adds cells to the model in a single step
    this.addGraphRects(this.getRects())

    // graph.zoomActual()
    // graph.fit()
    // graph.view.rendering = true
    // graph.refresh()
  }

  ///////////////////////////////////////////

  clearGraph () {
    const {graph} = this.editor
    const cells = this.getAllGraphCells()
    graph.removeCells(cells, true)
  }

  addGraphRects (items) {
    const {graph} = this.editor
    const parent = graph.getDefaultParent()

    graph.getModel().beginUpdate()

    try {
      const vertices = []
      items.forEach(p => {
        const map = p.map || {}

        const v = graph.insertVertex(parent, null,
          p.name, map.x || 10, map.y || 10, 135, 135, 'box-gray')
        v.userData = {
          id: p.id
        }

        vertices.push(v)
      })

      items.forEach((p, i) => {
        const map = p.map || {}
        if (!map.lines) return
        map.lines.forEach(t => {
          const targetIndex = findIndex(items, {id: t.id})
          if (targetIndex < 0) return

          const target = vertices[targetIndex]
          const source = vertices[i]

          graph.insertEdge(parent, null, '', source, target)
        })
      })
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
  }

  updateGraphRects (rects) {
    const {graph} = this.editor
    graph.getModel().beginUpdate()

    try {
      const cells = this.getAllGraphCells()
      rects.forEach(p => {
        const cell = this.findGraphCell(p.id, cells)
        if (!cell) return

        graph.getModel().setValue(cell, p.name)

        /////////////////////////////////////////

        if (p.map && p.map.lines) {
          const edges = graph.getAllEdges([cell])
            .filter(p => p.source === cell)

          const {lines} = p.map
          const targetIds = []
          edges.forEach(edge => {
            const data = edge.target.userData
            if (!data) return
            const targetId = data.id
            targetIds.push(targetId)
            const lineIndex = findIndex(lines, {id: targetId})
            if (lineIndex >= 0) return

            graph.removeCells([edge])
          })
        }
        /////////////////////////////////////////
      })
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate()
    }

  }

  removeGraphRects (rects) {
    const {graph} = this.editor
    graph.getModel().beginUpdate()

    try {
      const cells = this.getAllGraphCells()
      rects.forEach(p => {
        const cell = this.findGraphCell(p.id, cells)
        if (!cell) return

        graph.getModel().remove(cell)
      })
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
  }

  getSelectedRect () {
    const {graph} = this.editor
    const cell = graph.getSelectionCell()
    if (!cell || !cell.userData) return null
    return this.findRect(cell.userData.id)
  }

  getAllGraphCells () {
    const {graph} = this.editor
    const cells = graph.getChildVertices(graph.getDefaultParent())
    return cells
  }

  findGraphCell (rectId, allCells) {
    const cells = allCells || this.getAllGraphCells()
    const index = findIndex(cells, {
      userData: {id: rectId}
    })
    if (index < 0) return null
    return cells[index]
  }

  onUpdateRectState (id, good, bad) {
    if (!bad && !good) return

    const {graph} = this.editor
    const cell = this.findGraphCell(id)
    if (!cell) return

    graph.getModel().setStyle(cell, bad ? 'box-red' : 'box-green')
  }

  ///////////////////////////////////////////
  updateGroup () {
    this.props.updateWfRectGroup(this.props.selectedWfRectGroup)
  }

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return {
        ...p,
        type: 'User'
      }
    }), sysSearchOptions.map(p => {
      return {
        ...p,
        type: 'System'
      }
    }))
  }

  getRects () {
    const {selectedWfRectGroup} = this.props
    if (!selectedWfRectGroup) return []

    return selectedWfRectGroup.rects || []
  }

  findRect (id) {
    const rects = this.getRects()
    const index = findIndex(rects, {id})
    if (index < 0) return null

    return rects[index]
  }

  ////////////////////

  onClickAddItem () {
    this.props.showWfRectModal(true)
  }

  onCloseWfRectModal () {
    this.props.showWfRectModal(false)
  }

  onSaveWfRect (params) {
    if (!params.id) {
      params.id = guid()
      params.map = {
        x: 100, y: 100,
        lines: []
      }
      this.props.addGaugeRect(params, this.props.selectedWfRectGroup)
    } else {
      this.props.updateGaugeRect(params, this.props.selectedWfRectGroup)
    }
  }

  ////////////////////

  onClickEditItem () {
    const rect = this.getSelectedRect()
    if (!rect) return showAlert('Please choose rect')

    this.props.showWfRectModal(true, rect)
  }

  onClickDeleteItem () {
    const {graph} = this.editor
    const cell = graph.getSelectionCell()
    if (!cell) return

    if (cell.vertex){
      if (!cell.userData) return

      const rect = this.findRect(cell.userData.id)

      if (!rect) return showAlert('Please choose rect')

      showConfirm('Are you sure you want to remove?', btn => {
        if (btn !== 'ok') return
        this.props.removeGaugeRect(rect, this.props.selectedWfRectGroup)
      })
    } else if (cell.edge) {
      if (cell.source && cell.target) {
        let source = this.findRect(cell.source.userData.id)
        if (!source) return
        source = {
          ...source,
          map: {
            ...source.map,
            lines: source.map.lines.filter(p => p.id !== cell.target.userData.id)
          }
        }
        this.props.updateGaugeRect(source, this.props.selectedWfRectGroup)
      }
    }
  }

  ////////////////////

  onClickShowSearch (rect, good) {
    if (!rect) return
    const searchList = this.getSearchList()

    const index = findIndex(searchList, {id: good ? rect.goodId : rect.badId})
    if (index < 0) return
    const search = searchList[index]
    const data = JSON.parse(search.data || '{}')
    const {workflows, devices, allDevices} = this.props
    const searchParams = buildServiceParams(data, {
      dateRanges: getRanges(),
      collections, severities, workflows,
      allDevices: devices || allDevices,
      queryDateFormat
    })
    this.props.showRectSearchModal(true, searchParams)
  }

  onCloseRectSearch () {
    this.props.showRectSearchModal(false)
  }

  ////////////////////

  onClickShowGroups () {
    this.props.showWfRectGroupsModal(true)
  }

  onCloseRectGroupsModal () {
    this.props.showWfRectGroupsModal(false)
  }

  onChangeGroup (e, index, value) {
    const {wfRectGroups} = this.props
    this.props.selectWfRectGroup(wfRectGroups[index])
  }

  /////////////////////

  onChangeQuery (e, value) {
    this.setState({
      query: value
    })
  }

  ////////////////////
  renderRect (rect, index) {
    return (
      <RectItem
        {...this.props}
        key={rect.id || index}
        rect={rect}
        searchList={this.getSearchList()}
        onUpdateColor={this.onUpdateRectState.bind(this)}
      />
    )
  }

  renderWfRectModal () {
    if (!this.props.wfRectModalOpen) return null
    const list = this.getSearchList()
    const searchList = list.map(p => ({
      label: p.name,
      value: p.id
    }))
    return (
      <WfRectModal
        searchList={searchList}
        editWfRect={this.props.editWfRect}
        onSubmit={this.onSaveWfRect.bind(this)}
        onHide={this.onCloseWfRectModal.bind(this)}/>
    )
  }

  renderSearchModal () {
    if (!this.props.rectSearchModalOpen) return null
    return (
      <RectSearchModal
        params={this.props.rectSearchParams}
        showEntityDetailModal={this.props.showEntityDetailModal}
        onHide={this.onCloseRectSearch.bind(this)}/>
    )
  }

  renderEntityDetailModal () {
    if (!this.props.entityDetailModalOpen) return null
    return (
      <EntityDetailModal
        {...this.props}
      />
    )
  }

  renderMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={this.onClickAddItem.bind(this)}><AddCircleIcon/></IconButton>
        <IconButton onTouchTap={this.onClickEditItem.bind(this)}><InfoIcon/></IconButton>
        <IconButton onTouchTap={this.onClickDeleteItem.bind(this)}><DeleteIcon/></IconButton>
      </div>
    )
  }

  renderRectGroupsModal () {
    if (!this.props.wfRectGroupsModalOpen) return null
    return (
      <WfRectGroupsModal
        {...this.props}
        onHide={this.onCloseRectGroupsModal.bind(this)}
      />
    )
  }

  render () {
    const {selectedWfRectGroup} = this.props
    return (
      <div className="flex-vertical flex-1">
        <div>
          <SelectField
            hintText="Group"
            className="valign-top margin-lg-left"
            value={selectedWfRectGroup ? selectedWfRectGroup.id : null}
            onChange={this.onChangeGroup.bind(this)}
            style={{width: 140}}>
            {this.props.wfRectGroups.map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>

          <IconButton onTouchTap={this.onClickShowGroups.bind(this)}><AddCircleIcon/></IconButton>

          <TextField name="inputquery" hintText="Query" value={this.state.query} onChange={this.onChangeQuery.bind(this)} className="valign-top margin-lg-left"/>

          <div className="pull-right text-right">
            <IconButton onTouchTap={this.onClickAddItem.bind(this)}><AddCircleIcon/></IconButton>
            <IconButton onTouchTap={this.onClickEditItem.bind(this)}><InfoIcon/></IconButton>
            <IconButton onTouchTap={this.onClickDeleteItem.bind(this)}><DeleteIcon/></IconButton>
          </div>
        </div>
        <div className="flex-1">
          {this.getRects().map(this.renderRect.bind(this))}
          <div id="graph" className="graph-base" style={{width: '100%', height: '100%'}}></div>
          {this.renderWfRectModal()}
          {this.renderSearchModal()}
          {this.renderEntityDetailModal()}
          {this.renderRectGroupsModal()}
        </div>
      </div>

    )
  }
}
