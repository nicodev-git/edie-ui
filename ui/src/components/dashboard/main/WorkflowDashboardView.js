import React from 'react'
import {concat} from 'lodash'
import {IconButton, SelectField, MenuItem, TextField} from 'material-ui'
import {debounce, findIndex} from 'lodash'
import moment from 'moment'
import {deepPurpleA400, purple500} from 'material-ui/styles/colors'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconWork from 'material-ui/svg-icons/action/work'
import IconGroup from 'material-ui/svg-icons/action/group-work'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconParam from 'material-ui/svg-icons/action/input'
import IconClose from 'material-ui/svg-icons/navigation/close'

import WfRectModal from './workflow/WfRectModal'
import RectItem from './workflow/RectItem'

import {guid, severities, queryDateFormat, collections} from 'shared/Global'
import {showAlert, showConfirm, showPrompt} from 'components/common/Alert'
import RectSearchModal from './workflow/RectSearchModal'

import {buildServiceParams} from 'util/Query'
import {getRanges} from 'components/common/DateRangePicker'
import EntityDetailModal from 'components/sidebar/search/EntityDetailModal'
import WfRectGroupsModal from './workflow/WfRectGroupsModal'
import RectIconSet from './workflow/RectIconSet'

import FloatingMenu from 'components/common/floating/FloatingMenu'

const RECT_W = 135
const RECT_H = 135

export default class WorkflowDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      paramValues: [],
      paramValueInputs: []
    }

    this.menuItems = [{
      label: 'Add Param',
      icon: <IconParam/>,
      onClick: this.onClickAddParam.bind(this)
    }, {
      label: 'Add Group',
      icon: <IconGroup/>,
      color: purple500,
      onClick: this.onClickShowGroups.bind(this)
    }, {
      label: 'Add Item',
      icon: <IconWork/>,
      color: deepPurpleA400,
      onClick: this.onClickAddItem.bind(this)
    }]

    this.debOnClick = debounce(this.onClickRect.bind(this), 250)
  }
  componentWillMount () {
    this.debUpdateGroup = debounce(this.updateGroup.bind(this), 2000)
    this.props.selectWfRectGroup(null)
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
    graph.foldingEnabled = 0
    graph.cellsEditable = 0
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
      if (!cell) return

      const style = graph.getModel().getStyle(cell)
      if (!style) return

      if (style.startsWith('box-')) {
        if (e.currentTarget.textContent && cell.userData) {
          evt.consume()
          const rect = this.findRect(cell.userData.id)

          if (style === 'box-gray') return

          this.debOnClick()
          this.fnOnClick = () => {
            this.onClickShowSearch(rect, style === 'box-green')
          }
        }
      }
    })

    ///////////////////////////

    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) => {
      const e = evt.getProperty('event'); // mouse event
      const cell = evt.getProperty('cell'); // cell may be null
      if (!cell) return

      const style = graph.getModel().getStyle(cell)
      if (!style) return

      if (style.startsWith('box-')) {
        evt.consume();
        if (e.currentTarget.textContent && cell.userData) {
          const rect = this.findRect(cell.userData.id)

          this.debOnClick()
          this.fnOnClick = () => {
            this.onClickEditItem(rect)
          }
        }

        // if (e.currentTarget.textContent && cell.userData) {
        //
        //   const rect = this.findRect(cell.userData.id)
        //
        //   if (style === 'box-gray') return
        //
        //   this.onClickShowSearch(rect, style === 'box-green')
        // }
      }
    })

    this.initEvents()

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
    const {mxConstants, mxPerimeter} = window
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


    graph.getStylesheet().putCellStyle('info-button', {
      [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_IMAGE,
      [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
      [mxConstants.STYLE_IMAGE]: '/resources/images/dashboard/info.png',
      [mxConstants.STYLE_MOVABLE]: 0
    })
  }

  initEvents () {
    const {graph} = this.editor
    const {mxRectangle, mxUtils} = window
    const me = this

    const iconTolerance = 20
    graph.addMouseListener({
      mouseDown: function(sender, me) {
        // Hides icons on mouse down
        if (this.currentState)
        {
          this.dragLeave(me.getEvent(), this.currentState);
          this.currentState = null;
        }
      },
      mouseMove: function(sender, me) {
        let tmp
        if (this.currentState && (me.getState() === this.currentState ||
            me.getState() == null))
        {
          var tol = iconTolerance;
          tmp = new mxRectangle(me.getGraphX() - tol,
            me.getGraphY() - tol, 2 * tol, 2 * tol);

          if (mxUtils.intersects(tmp, this.currentState))
          {
            return;
          }
        }

        tmp = graph.view.getState(me.getCell());

        // Ignores everything but vertices
        if (graph.isMouseDown || (tmp && !graph.getModel().isVertex(tmp.cell)))
        {
          tmp = null;
        }

        if (tmp !== this.currentState)
        {
          if (this.currentState)
          {
            this.dragLeave(me.getEvent(), this.currentState);
          }

          this.currentState = tmp;

          if (this.currentState)
          {
            this.dragEnter(me.getEvent(), this.currentState);
          }
        }
      },
      mouseUp: function(sender, me) {

      },

      dragEnter: function(evt, state) {
        if (!me.state.editMode) return
        if (!this.currentIconSet) {
          this.currentIconSet = new RectIconSet({
            state,
            onClickInfo: me.onClickInfoIcon.bind(me),
            onClickDelete: me.onClickDeleteIcon.bind(me)
          })
        }
      },
      dragLeave: function(evt, state) {
        if (this.currentIconSet) {
          this.currentIconSet.destroy()
          this.currentIconSet = null;
        }
      }
    })
  }

  needUpdateRects(prevRects, rects) {
    const added = []
    const updated = []
    const removed = prevRects.filter(p => rects.filter(n => n.uid === p.uid).length === 0)

    rects.forEach(n => {
      const found = prevRects.filter(p => p.uid === n.uid)
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

  onClickInfoIcon (cell) {
    const rect = this.findRect(cell.userData.id)
    this.onClickEditItem(rect)
  }

  onClickDeleteIcon (cell) {
    this.onClickDeleteItem(cell)
  }

  onClickRect () {
    this.fnOnClick && this.fnOnClick()
  }

  ///////////////////////////////////////////

  loadGroup (group) {
    this.clearGraph()
    // Adds cells to the model in a single step
    this.addGraphRects(this.getRects())
    this.setState({
      paramValues: [],
      paramValueInputs: []
    })
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

        const x = map.x || 10
        const y = map.y || 10

        ////////////////////

        const v = graph.insertVertex(parent, null,
          p.name, x, y, RECT_W, RECT_H, 'box-gray')
        v.userData = {
          id: p.uid
        }
        vertices.push(v)

        ////////////////////

        // const infoBtn = graph.insertVertex(v, null, '', RECT_W - 28, RECT_H - 28, 24, 24, 'info-button')
        // infoBtn.setConnectable(false)
        // infoBtn.userData = v.userData
        // infoBtn.cursor = 'pointer'

        ///////////////////

      })

      items.forEach((p, i) => {
        const map = p.map || {}
        if (!map.lines) return
        map.lines.forEach(t => {
          const targetIndex = findIndex(items, {uid: t.id})
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
        const cell = this.findGraphCell(p.uid, cells)
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
        const cell = this.findGraphCell(p.uid, cells)
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
    const {graph} = this.editor
    const cell = this.findGraphCell(id)
    if (!cell) return

    let style = 'box-gray'
    if (bad || good) style = bad ? 'box-red' : 'box-green'

    graph.getModel().setStyle(cell, style)
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

  findRect (uid) {
    const rects = this.getRects()
    const index = findIndex(rects, {uid})
    if (index < 0) return null

    return rects[index]
  }

  ////////////////////

  onClickAddItem () {
    const {selectedWfRectGroup} = this.props
    if (!selectedWfRectGroup) {
      showAlert('Please add group.', () => {
        this.onClickShowGroups()
      })
      return
    }
    this.props.showWfRectModal(true)
  }

  onClickAddParam () {
    const {selectedWfRectGroup} = this.props
    if (!selectedWfRectGroup) return
    showPrompt('Param Name', '', text => {
      if (!text) return
      this.props.updateWfRectGroup({
        ...selectedWfRectGroup,
        paramNames: [...(selectedWfRectGroup.paramNames || []), text]
      })

      const {paramValues, paramValueInputs} = this.state
      paramValues.push('')
      paramValueInputs.push('')
      this.setState({
        paramValues,
        paramValueInputs
      })
    })
  }

  onCloseWfRectModal () {
    this.props.showWfRectModal(false)
  }

  onSaveWfRect (params) {
    if (!params.uid) {
      params.uid = guid()
      params.map = {
        x: 100, y: 100,
        lines: []
      }
      this.props.addGaugeRect(params, this.props.selectedWfRectGroup)
    } else {
      this.props.updateGaugeRect(params, this.props.selectedWfRectGroup, true)
      this.debUpdateGroup()
    }
  }

  ////////////////////

  onClickEditItem (rect) {
    if (!rect) return showAlert('Please choose rect')

    this.props.showWfRectModal(true, rect)
  }

  onClickDeleteItem (cell) {
    if (!cell) return

    if (cell.vertex){
      if (!cell.userData) return

      const rect = this.findRect(cell.userData.id)

      if (!rect) return showAlert('Please choose rect')

      showConfirm('Are you sure you want to remove?', btn => {
        if (btn !== 'ok') return
        this.props.removeGaugeRect(rect, this.props.selectedWfRectGroup, true)
        this.debUpdateGroup()
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
        this.props.updateGaugeRect(source, this.props.selectedWfRectGroup, true)
        this.debUpdateGroup()
      }
    }
  }

  ////////////////////

  onClickShowSearch (rect, good) {
    if (!rect) return
    const {paramNames} = this.props.selectedWfRectGroup
    const {paramValues} = this.state
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

    searchParams.to = new Date().getTime()
    searchParams.from = moment().subtract(rect.interval, rect.intervalUnit).valueOf()

    if (paramNames) {
      paramNames.forEach((p, i) => {
        if (!p) return
        const paramValue = paramValues[i]

        if (!paramValue && searchParams.q.indexOf(`$${p}`) >= 0) return

        searchParams.q = searchParams.q.replace(
          new RegExp(`\\$${p}`, 'i'), paramValue)
      })
    }

    this.props.showRectSearchModal(true, {
      name: search.name,
      searchParams
    })
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

  onChangeParamValue (i, e) {
    const {paramValueInputs} = this.state
    paramValueInputs[i] = e.target.value
    this.setState({
      paramValueInputs
    })
  }

  onClickParamEdit (i) {
    const {selectedWfRectGroup} = this.props
    let {paramNames} = selectedWfRectGroup
    if (!paramNames) paramNames = []
    showPrompt('Param Name', paramNames[i] || '', text => {
      if (!text) return
      this.props.updateWfRectGroup({
        ...selectedWfRectGroup,
        paramNames: paramNames.map((p, j) => i === j ? text : p)
      })
    })
  }

  onClickParamDelete (i) {
    const {selectedWfRectGroup} = this.props
    let {paramNames} = selectedWfRectGroup
    paramNames.splice(i, 1)
    this.props.updateWfRectGroup({
      ...selectedWfRectGroup,
      paramNames
    })

    const {paramValues, paramValueInputs} = this.state
    paramValues.splice(i, 1)
    paramValueInputs.splice(i, 1)
    this.setState({
      paramValues,
      paramValueInputs
    })
  }

  onClickSetParamValue (i) {
    let {paramValues, paramValueInputs} = this.state
    paramValues = [...paramValues]
    paramValues[i] = paramValueInputs[i]
    this.setState({
      paramValues
    })
  }

  onClickEditMode () {
    const {editMode} = this.state
    this.setState({
      editMode: !editMode
    })
  }

  onClickDelete () {
    const {graph} = this.editor
    const cell = graph.getSelectionCell()
    if (!cell || cell.vertex) return
    this.onClickDeleteItem(cell)
  }

  ////////////////////
  renderRect (rect, index) {
    const {selectedWfRectGroup} = this.props
    const {paramValues} = this.state
    return (
      <RectItem
        {...this.props}
        key={rect.uid || index}
        rect={rect}
        searchList={this.getSearchList()}
        onUpdateColor={this.onUpdateRectState.bind(this)}
        paramNames={selectedWfRectGroup.paramNames || []}
        paramValues={paramValues || []}
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

  renderRectGroupsModal () {
    if (!this.props.wfRectGroupsModalOpen) return null
    return (
      <WfRectGroupsModal
        {...this.props}
        onHide={this.onCloseRectGroupsModal.bind(this)}
      />
    )
  }

  renderParamInputs () {
    const {selectedWfRectGroup} = this.props
    const {paramValueInputs} = this.state
    if (!selectedWfRectGroup || !selectedWfRectGroup.paramNames) return null
    return selectedWfRectGroup.paramNames.map((p, i) =>
      <div key={i}>
        <TextField name={`paramValue${i}`}
                   value={paramValueInputs[i] || ''}
                   hintText={p || 'Value'}
                   onChange={this.onChangeParamValue.bind(this, i)}
                   className="valign-top margin-lg-left"
                   style={{width: 160}}
        />
        <div className="inline-block valign-top margin-xs-top">
          {this.state.editMode ? (
            <IconButton
              onTouchTap={this.onClickParamEdit.bind(this, i)}>
              <EditIcon/>
            </IconButton>
          ) : (
            <IconButton
              onTouchTap={this.onClickSetParamValue.bind(this, i)}>
              <ArrowRightIcon/>
            </IconButton>
          )}

          {this.state.editMode ? (
            <IconButton
              onTouchTap={this.onClickParamDelete.bind(this, i)}>
              <IconClose/>
            </IconButton>
          ) : null}
        </div>

      </div>
    )
  }

  render () {
    const {selectedWfRectGroup} = this.props
    return (
      <div className="flex-vertical flex-1">
        <div style={{position: 'absolute', top: -68, left: 200, right: 0}}>
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

          <div className="pull-right text-right">
            <IconButton onTouchTap={this.onClickEditMode.bind(this)}><EditIcon/></IconButton>
            <IconButton onTouchTap={this.onClickDelete.bind(this)} tooltip="Delete Connection"><DeleteIcon/></IconButton>
          </div>
        </div>
        <div className="flex-1">
          {this.getRects().map(this.renderRect.bind(this))}
          <div id="graph" className="graph-base" style={{width: '100%', height: '100%'}}></div>

          <div style={{position: 'absolute', left: 20, top: 5}}>
            {this.renderParamInputs()}
          </div>

          <FloatingMenu menuItems={this.menuItems}/>

          {this.renderWfRectModal()}
          {this.renderSearchModal()}
          {this.renderEntityDetailModal()}
          {this.renderRectGroupsModal()}
        </div>
      </div>

    )
  }
}
