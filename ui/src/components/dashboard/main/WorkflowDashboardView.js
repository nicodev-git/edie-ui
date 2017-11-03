import React from 'react'
import {concat} from 'lodash'
import {IconButton} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import {debounce, findIndex} from 'lodash'

import WfRectModal from './workflow/WfRectModal'
import RectItem from './workflow/RectItem'

import {guid} from 'shared/Global'

export default class WorkflowDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.rectState = {}
  }
  componentWillMount () {
    this.debUpdateBoard = debounce(this.updateBoard.bind(this), 2000)
  }

  componentDidMount () {
    const {mxConstants, mxUtils, mxEditor, mxEvent} = window
    const node = mxUtils.load('/resources/plugins/mxgraph/config/workfloweditor.xml').getDocumentElement();
    const editor = new mxEditor(node);
    const graph = editor.graph

    this.editor = editor

    graph.minFitScale = 1
    graph.maxFitScale = 1
    // graph.maximumGraphBounds = new window.mxRectangle(0, 0, 1024, 768)
    // const graph = new window.mxGraph(document.getElementById('graphContainer'))
    editor.setMode('connect')
    //editor.defaultEdge.style = 'straightEdge'

    // Enables rubberband selection
    new window.mxRubberband(graph)

    //Register styles
    var style = {}
    style[mxConstants.STYLE_SHAPE] = 'box'
    style[mxConstants.STYLE_STROKECOLOR] = '#D1282C'
    style[mxConstants.STYLE_FILLCOLOR] = '#D1282C'
    style[mxConstants.STYLE_FONTCOLOR] = '#ffffff'
    style[mxConstants.STYLE_FONTSIZE] = '15'
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD
    style[mxConstants.STYLE_ROUNDED] = 1
    style[mxConstants.STYLE_ARCSIZE] = 6
    graph.getStylesheet().putCellStyle('boxstyle', style)

    // Adds cells to the model in a single step
    this.addGraphRects(this.getRects())

    // graph.zoomActual()
    graph.fit()
    graph.view.rendering = true
    graph.refresh()

    /////////////////////////

    graph.addListener(mxEvent.CELLS_MOVED, (sender, evt) => {
      const v = evt.properties.cells[0]
      const {id} = v.userData
      // console.log(v)

      const rect = this.findRect(id)
      if (!rect) return

      rect.map = rect.map || {}
      rect.map.x = v.geometry.x
      rect.map.y = v.geometry.y

      console.log(rect)

      this.props.updateGaugeRect(rect, this.props.board, true)
      this.debUpdateBoard()
    })

    /////////////////////////

    graph.addListener(mxEvent.CELL_CONNECTED, (sender, evt) => {
      const {edge, source} = evt.properties
      if (source) return
      const sourceId = edge.source.userData.id
      const destId = edge.target.userData.id

      const sourceRect = this.findRect(sourceId)
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

      sourceRect.map.lines.push({
        id: destId
      })

      console.log(sourceRect)
      this.props.updateGaugeRect(sourceRect, this.props.board, true)
      this.debUpdateBoard()
    })
  }

  componentDidUpdate (prevProps) {
    const prevRects = prevProps.board.rects || []
    const rects = this.getRects()
    const check = this.needUpdateRects(prevRects, rects)
    if (check.result) {
      console.log(`Change detected. Added: ${check.added.length} Updated: ${check.updated.length} Removed: ${check.removed.length}`)
      this.addGraphRects(check.added)
    }
  }

  needUpdateRects(prevRects, rects) {
    const added = []
    const updated = []
    const removed = prevRects.filter(p => rects.filter(n => n.id === p.id) === 0)

    rects.forEach(n => {
      const found = prevRects.filter(p => p.id === n.id)
      if (found.length) {
        const p = found[0]
        if (this.isRectDifferent(n, p)) {
          updated.add(n)
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
    if (n.name !== p.name) return true
    return false
  }
  ///////////////////////////////////////////

  addGraphRects (items) {
    const {graph} = this.editor
    const parent = graph.getDefaultParent()

    graph.getModel().beginUpdate()

    try {
      const vertices = []
      items.forEach(p => {
        const map = p.map || {}

        const v = graph.insertVertex(parent, null,
          p.name, map.x || 10, map.y || 10, 135, 135, 'boxstyle')
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

  onUpdateRectState (id, color) {
    console.log(`${id} : ${color}`)
    // const {graph} = this.editor
  }

  ///////////////////////////////////////////
  updateBoard () {
    this.props.updateGaugeBoard(this.props.board)
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
    return this.props.board.rects || []
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
      this.props.addGaugeRect(params, this.props.board)
    } else {
      this.props.updateGaugeRect(params, this.props.board)
    }

  }

  ////////////////////

  onClickEditItem (rect) {
    this.props.showWfRectModal(true, rect)
  }

  onStopDrag (rect, e, data) {
    rect.map = rect.map || {}
    rect.map.x = data.x
    rect.map.y = data.y

    this.props.updateGaugeRect(rect, this.props.board, true)
    this.debUpdateBoard()
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

  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={this.onClickAddItem.bind(this)}><AddCircleIcon/></IconButton>
      </div>
    )
  }

  render () {
    return (
      <div className="flex-1">
        {this.renderAddMenu()}
        {this.getRects().map(this.renderRect.bind(this))}
        <div id="graph" className="graph-base" style={{width: '100%', height: '100%'}}></div>
        {this.renderWfRectModal()}
      </div>
    )
  }
}
