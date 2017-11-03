import React from 'react'
import {concat} from 'lodash'
import {IconButton} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import Draggable from 'react-draggable'
import {debounce, findIndex} from 'lodash'

import WfRectModal from './workflow/WfRectModal'
import RectItem from './workflow/RectItem'

import {guid} from 'shared/Global'

export default class WorkflowDashboardView extends React.Component {
  componentWillMount () {
    this.debUpdateBoard = debounce(this.updateBoard.bind(this), 2000)
  }

  componentDidMount () {
    const node = window.mxUtils.load('/resources/plugins/mxgraph/config/workfloweditor.xml').getDocumentElement();
    const editor = new window.mxEditor(node);
    const graph = editor.graph

    graph.minFitScale = 1
    graph.maxFitScale = 1
    // graph.maximumGraphBounds = new window.mxRectangle(0, 0, 1024, 768)
    // const graph = new window.mxGraph(document.getElementById('graphContainer'))
    editor.setMode('connect')
    //editor.defaultEdge.style = 'straightEdge'

    // Enables rubberband selection
    new window.mxRubberband(graph)

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent()

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate()
    try {

      this.getRects().forEach(p => {
        const map = p.map || {}

        const v = graph.insertVertex(parent, null,
          p.name, map.x || 10, map.y || 10, 100, 100)
        v.userData = p.id
      })
      // graph.insertEdge(parent, null, '', v1, v2)
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
    // graph.zoomActual()
    graph.fit()
    graph.view.rendering = true
    graph.refresh()

    /////////////////////////

    graph.addListener(window.mxEvent.CELLS_MOVED, (sender, evt) => {
      const v = evt.properties.cells[0]
      const id = v.userData
      // console.log(v)

      const rect = this.findRect(id)
      if (!rect) return

      rect.map = rect.map || {}
      rect.map.x = v.geometry.x + evt.properties.dx
      rect.map.y = v.geometry.y + evt.properties.dy

      console.log(rect)

      this.props.updateGaugeRect(rect, this.props.board, true)
      this.debUpdateBoard()
    })
  }

  componentDidUpdate (prevProps) {
    // const prevRects = prevProps.board.rects || []
    // const rects = this.getRects()
    // const check = this.needUpdateRects(prevRects, rects)
    // if (check.result) {
    //
    // } else {
    //
    // }
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
    const map = rect.map || {}
    return (
      <Draggable
        key={rect.id || index}
        position={{x: map.x || 0, y: map.y || 0}}
        onStop={this.onStopDrag.bind(this, rect)}
        defaultPosition={{x: map.x || 0, y: map.y || 0}}
      >
        <div className="inline-block">
          <RectItem
            {...this.props}
            rect={rect}
            searchList={this.getSearchList()}
          />
        </div>
      </Draggable>
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
        <div id="graph" className="graph-base" style={{width: '100%', height: '100%'}}>

        </div>
        {this.renderWfRectModal()}
      </div>
    )
  }
}
