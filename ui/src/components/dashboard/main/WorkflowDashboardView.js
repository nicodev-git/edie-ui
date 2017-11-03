import React from 'react'
import {concat} from 'lodash'
import {IconButton} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import Draggable from 'react-draggable'
import {debounce} from 'lodash'

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
      const v1 = graph.insertVertex(parent, null,
        'Hello,', 20, 20, 80, 30)
      const v2 = graph.insertVertex(parent, null,
        'World!', 200, 150, 80, 30)
      graph.insertEdge(parent, null, '', v1, v2)
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
  }

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
