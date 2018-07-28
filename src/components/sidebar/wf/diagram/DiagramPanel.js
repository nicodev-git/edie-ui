import React from 'react'
import {DropTarget} from 'react-dnd'
import {assign} from 'lodash'

import {DragTypes, DiagramTypes, gridBg} from 'shared/Global'
import DRect from './DRect'
import {handlePoints} from './DiagramItems'

import {findStepLines, getHandlePoints} from 'shared/LineUtil'

function collect (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

const canvasTarget = {
    canDrop () {
        return true
    },

    drop (props, monitor, component) {
        props.onDrop(monitor.getItem(), monitor.getClientOffset(), component)
    }
}


const style = {
    backgroundImage: `url(data:image/svg+xml;base64,${gridBg})`,
    position: 'absolute',
    minWidth: '2000px',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)'
}

class DiagramPanel extends React.Component {

    onSvgRef (el) {
        this.svgEl = el
    }

    // //////////////////////////////////////////////////

    onMouseDownObject (obj, e) {
        console.log(obj)
        this.props.setDiagramMouseDown(this.props.stateId, true, this.convertEventPosition(e), 'object')
        this.props.selectDiagramObject(this.props.stateId, obj)
        e.stopPropagation()
    }

    onMouseOverObject (obj) {
        this.props.setHoverDiagramObject(this.props.stateId, obj)
    }

    onMouseOutObject (obj) {
        this.props.clearHoverDiagramObject(this.props.stateId, obj)
    }

    onDblClickObject (obj) {
        const {stateId, flow, onDblClickFlowItem} = this.props
        this.props.selectDiagramObject(stateId, obj)

        onDblClickFlowItem && onDblClickFlowItem(stateId, flow, obj)
    }

    onMouseDownInfo (obj) {
        this.onDblClickObject(obj)
    }

    onMouseDownEdit (obj, e) {
        const {stateId, flow, onClickItemInfo} = this.props
        onClickItemInfo && onClickItemInfo(stateId, flow, obj, e)
    }

    // ///////////////////////////////////////////////////

    onMouseOverHoverPoint (object, point) {
        this.props.setHoverPoint(this.props.stateId, point)
    }

    // ///////////////////////////////////////////////////

    onMouseDownHandlePoint (point, e) {
        this.props.setDiagramMouseDown(this.props.stateId, true, this.convertEventPosition(e), 'resize-handle')
        this.props.setDiagramResizingPoint(this.props.stateId, point)
        e.stopPropagation()
    }

    // ///////////////////////////////////////////////////

    convertEventPosition (e) {
        const rt = this.svgEl.getClientRects()[0]
        return {
            x: e.clientX - rt.left,
            y: e.clientY - rt.top
        }
    }

    onDragObjectStart (e) {
        this.props.setDiagramDragging(this.props.stateId, true)
    }

    onDraggingObject (e) {
    }

    onDragObjectEnd (e) {
        const {flow, mouseDownPos, cursorPos, workflowItems, stateId, selected} = this.props

        const moveFlowItems = this.props.moveFlowItems || this.props.moveDiagramSelectedObjects
        moveFlowItems(stateId, flow, {
            x: cursorPos.x - mouseDownPos.x,
            y: cursorPos.y - mouseDownPos.y
        }, workflowItems, selected)
    }

    // ///////////////////////////////////////////////////

    onResizeObjectStart (e) {
        this.props.setDiagramResizing(this.props.stateId, true)
    }

    onResizeObject (offset) {
        this.props.resizeDiagramSelectedObjects(this.props.stateId, offset)
    }

    onResizeObjectEnd (e) {
        const {flow, workflowItems, stateId, selected} = this.props

        const moveFlowItems = this.props.moveFlowItems || this.props.moveDiagramSelectedObjects
        moveFlowItems(stateId, flow, {
            x: 0,
            y: 0
        }, workflowItems, selected)
    }

    // ///////////////////////////////////////////////////

    onMouseDownLineHandle (point, pos, object, e) {
        this.props.setDiagramMouseDown(this.props.stateId, true, this.convertEventPosition(e), 'line-handle')
        this.props.setDiagramLineDrawing(this.props.stateId, true, false, null)
        this.props.setDiagramLineStartPoint(this.props.stateId, pos, object, point)
        this.props.setDiagramLineEndPoint(this.props.stateId, null, null, -1)
        e.stopPropagation()
    }

    onLineDraw (pos) {
        const {hovered, hoverPoint, isLineDrawingStart, lineStepPoint} = this.props
        if (lineStepPoint < 0) {
            // Start/End point?
            if (isLineDrawingStart) {
                this.props.setDiagramLineStartPoint(this.props.stateId, pos, hovered, hoverPoint)
            } else {
                this.props.setDiagramLineEndPoint(this.props.stateId, pos, hovered, hoverPoint)
            }
        } else {
            // Step point?
        }
    }

    onLineDrawEnd (e) {
        const {lineEndObject, lineEndObjectPoint, lineStartObject, lineStartObjectPoint,
            lastId, drawingLine, lineStepPoint, workflowItems, stateId, flow} = this.props

        this.props.setDiagramLineStepPoint(stateId, -1)

        if (lineStepPoint >= 0) {
            const points = this.getStepUpdatedPoints()
            const handlePoints = getHandlePoints(points[0], points.filter((p, i) => i > 0 && i < (points.length - 1)), points[points.length - 1])
            this.props.updateDiagramLine(stateId, assign({}, drawingLine, {
                points,
                handlePoints
            }))
        } else {
            if (!lineEndObject || lineEndObjectPoint < 0 || !lineStartObject || lineStartObjectPoint < 0) return
            if (lineStartObject.id === lineEndObject.id) return

            let opr = 'nextSeq'
            if (lineStartObject.data.type === 'RULE') {
                const tpl = workflowItems[lineStartObject.imgIndex]
                opr = tpl.isBottomPoint(lineStartObjectPoint) ? 'falseOpr' : 'trueOpr'
            }

            const startTpl = workflowItems[lineStartObject.imgIndex]
            const endTpl = workflowItems[lineEndObject.imgIndex]
            const startPos = startTpl.getConnectionPoint(lineStartObject, lineStartObjectPoint)
            const endPos = endTpl.getConnectionPoint(lineEndObject, lineEndObjectPoint)

            const points = findStepLines(startTpl, startPos, lineStartObjectPoint, endTpl, endPos, lineEndObjectPoint)
            const handlePoints = getHandlePoints(points[0], points.filter((p, i) => i > 0 && i < (points.length - 1)), points[points.length - 1])

            if (drawingLine) {
                this.props.updateFlowLine(stateId, flow, drawingLine, assign({}, drawingLine, {
                    startObject: lineStartObject,
                    startPoint: lineStartObjectPoint,
                    endObject: lineEndObject,
                    endPoint: lineEndObjectPoint,
                    points,
                    handlePoints
                }))

                // this.props.updateDiagramLine(stateId, assign({}, drawingLine, {
                //     startObject: lineStartObject,
                //     startPoint: lineStartObjectPoint,
                //     endObject: lineEndObject,
                //     endPoint: lineEndObjectPoint,
                //     points,
                //     handlePoints
                // }), opr)
            } else {
                this.props.addFlowLine(stateId, flow, {
                    id: lastId + 1,
                    type: DiagramTypes.LINE,
                    startObject: lineStartObject,
                    startPoint: lineStartObjectPoint,
                    endObject: lineEndObject,
                    endPoint: lineEndObjectPoint,
                    points,
                    handlePoints
                }, opr)
            }
        }
    }

    // ///////////////////////////////////////////////////

    onMouseDownLine (line, e) {
        console.log('onMouseDownLine')
        this.props.setDiagramMouseDown(this.props.stateId, true, this.convertEventPosition(e), 'line')
        this.props.selectDiagramObject(this.props.stateId, line)
        e.stopPropagation()
    }

    onMouseDownLineMove (line, pointIndex, e) {
        console.log('onMouseDownLineMove')

        const {stateId} = this.props
        if (pointIndex === 0 || pointIndex === line.handlePoints.length - 1) {
            const isStart = pointIndex === 0
            const otherPos = line.handlePoints[pointIndex === 0 ? (line.handlePoints.length - 1) : 0]
            this.props.setDiagramLineStepPoint(stateId, -1)
            this.props.setDiagramMouseDown(stateId, true, this.convertEventPosition(e), 'line-handle')
            this.props.setDiagramLineDrawing(stateId, true, isStart, line)
            if (isStart) {
                this.props.setDiagramLineStartPoint(stateId, null, null, -1)
                this.props.setDiagramLineEndPoint(stateId, otherPos, line.endObject, line.endPoint)
            } else {
                this.props.setDiagramLineStartPoint(stateId, otherPos, line.startObject, line.startPoint)
                this.props.setDiagramLineEndPoint(stateId, null, null, -1)
            }
        } else {
            this.props.setDiagramMouseDown(stateId, true, this.convertEventPosition(e), 'line-handle')
            this.props.setDiagramLineStepPoint(stateId, pointIndex)
            this.props.setDiagramLineDrawing(stateId, true, null, line)
        }

        e.stopPropagation()
    }

    // ///////////////////////////////////////////////////

    onMouseDownPanel (e) {
        this.props.selectDiagramObject(this.props.stateId, null)
    }

    onMouseMovePanel (e) {
        const {isMouseDown, isDragging, isResizing, isLineDrawing, mouseDownObject, cursorPos} = this.props

        // Object dragging
        if (e.buttons === 1 && isMouseDown) {
            const pos = this.convertEventPosition(e)
            const offset = {
                x: pos.x - cursorPos.x,
                y: pos.y - cursorPos.y
            }

            this.props.setDiagramCursorPos(this.props.stateId, pos)

            if (mouseDownObject === 'object') {
                if (!isDragging) this.onDragObjectStart(e)
                this.onDraggingObject(e)
            } else if (mouseDownObject === 'resize-handle') {
                if (!isResizing) this.onResizeObjectStart(e)
                this.onResizeObject(offset)
            } else if (mouseDownObject === 'line-handle') {
                this.onLineDraw(cursorPos)
            }
        } else {
            if (isDragging || isResizing || isLineDrawing) this.props.setDiagramMouseDown(this.props.stateId, false)
        }
    }

    onMouseUpPanel (e) {
        const {isDragging, isResizing, isLineDrawing} = this.props
        if (isDragging) {
            this.onDragObjectEnd(e)
        }
        if (isResizing) {
            this.onResizeObjectEnd(e)
        }
        if (isLineDrawing) {
            this.onLineDrawEnd(e)
        }
        this.props.setDiagramMouseDown(this.props.stateId, false)
    }

    // ///////////////////////////////////////////////////

    getStepUpdatedPoints () {
        const {drawingLine, lineStepPoint, cursorPos, mouseDownPos} = this.props
        const { points, handlePoints } = drawingLine

        const handlePoint = handlePoints[lineStepPoint]
        const isHorizontalLine = handlePoint.y === points[lineStepPoint].y

        const offsetX = isHorizontalLine ? 0 : (cursorPos.x - mouseDownPos.x)
        const offsetY = isHorizontalLine ? (cursorPos.y - mouseDownPos.y) : 0

        const drawPoints = points.map((p, i) => {
            if (lineStepPoint === i - 1 || lineStepPoint === i) {
                return {
                    x: p.x + offsetX,
                    y: p.y + offsetY
                }
            }
            return p
        })

        return drawPoints
    }

    // ///////////////////////////////////////////////////

    renderObject (obj) {
        const {workflowItems, nameKey} = this.props
        if (workflowItems.length <= obj.imgIndex) return null
        const ItemObject = workflowItems[obj.imgIndex].component || DRect
        const listeners = {
            className: 'object',
            onMouseDown: this.onMouseDownObject.bind(this, obj),
            onMouseOver: this.onMouseOverObject.bind(this, obj),
            onDoubleClick: this.onDblClickObject.bind(this, obj)
        }

        return (
            <ItemObject key={obj.id} {...obj} name={obj.data[nameKey || 'name'] || obj.data['sentence']} listeners={listeners}/>
        )
    }

    renderObjects () {
        const {objects} = this.props

        return objects.map(obj => this.renderObject(obj))
    }

    renderLine (line) {
        const {points} = line

        return (
            <g key={`line-${line.id}`} style={{cursor: 'move'}}>
                <path
                    d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`} stroke="#0000FF" strokeWidth="2" fill="none"
                    strokeMiterlimit="10" markerEnd="url(#arrowEnd)"
                    onMouseDown={this.onMouseDownLine.bind(this, line)} pointerEvents="stroke"/>
            </g>
        )
    }

    renderLines () {
        const {lines} = this.props

        return lines.map(line => this.renderLine(line))
    }

    renderDrawingLines () {
        const {isLineDrawing, lineStart, lineEnd,
            lineStartObject, lineEndObject,
            lineStartObjectPoint, lineEndObjectPoint, lineStepPoint,
            drawingLine,
            workflowItems} = this.props
        if (!isLineDrawing) return null

        const attrs = {
            stroke: drawingLine ? '#00a8ff' : '#000000',
            fill: 'none',
            strokeMiterlimit: '10'
        }
        if (lineStepPoint < 0) {
            // Start/End point moving
            if (!lineStart || !lineEnd) return null
            if (drawingLine) {
                assign(attrs, {strokeDasharray: '3 3'})
            }

            if (lineEndObjectPoint < 0 || lineStartObjectPoint < 0) {
                return (
                    <path d={`M ${lineStart.x} ${lineStart.y} L ${lineEnd.x} ${lineEnd.y}`} {...attrs}/>
                )
            }

            const startItem = lineStartObject ? workflowItems[lineStartObject.imgIndex] : null
            const endItem = lineEndObject ? workflowItems[lineEndObject.imgIndex] : null

            const points = findStepLines(startItem, lineStart, lineStartObjectPoint, endItem, lineEnd, lineEndObjectPoint)
            return (
                <path d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`} {...attrs}/>
            )
        } else {
            // Step point moving
            const drawPoints = this.getStepUpdatedPoints()
            return (
                <path d={`M ${drawPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`} {...attrs}/>
            )
        }
    }

    renderSelection (obj) {
        const {x, y, w, h, type} = obj

        if (type === DiagramTypes.OBJECT) {
            return (
                <g key={`sel-${obj.id}`}>
                    <g style={{cursor: 'move'}}>
                        <rect
                            x={x} y={y} width={w} height={h} fill="none" stroke="#00a8ff" strokeDasharray="3 3"
                            pointerEvents="none"/>
                    </g>
                    {
                        handlePoints.map((p, index) =>
                            <g key={index} style={{cursor: p.cursor}}>
                                <image
                                    x={x + w * p.x - 8.5} y={y + h * p.y - 8.5}
                                    className="resize-handle"
                                    onMouseDown={this.onMouseDownHandlePoint.bind(this, index)}
                                    width="17"
                                    height="17"
                                    href="/images/handle.png"
                                    preserveAspectRatio="none"/>
                            </g>
                        )
                    }
                    {this.renderInfoButton(obj)}
                    {this.renderEditButton(obj)}
                </g>
            )
        } else if (type === DiagramTypes.LINE) {
            return (
                <g key={`sel-${obj.id}`}>
                    {
                        obj.handlePoints.map((p, i) =>
                            <g key={i} style={{cursor: 'move'}}>
                                <image
                                    x={p.x - 8.5} y={p.y - 8.5} width="17" height="17"
                                    href="/images/handle.png" preserveAspectRatio="none"
                                    onMouseDown={this.onMouseDownLineMove.bind(this, obj, i)}/>
                            </g>
                        )
                    }
                </g>
            )
        }
    }

    renderSelected () {
        const {selected} = this.props
        return selected.map(obj => this.renderSelection(obj))
    }

    renderHovered () {
        const {hovered, selected, hoverPoint, isDragging, workflowItems} = this.props
        if (!hovered || isDragging) return null
        if (selected && selected.filter(s => s.id === hovered.id).length > 0) return null

        const item = workflowItems[hovered.imgIndex]

        let points = []
        let hoverPointComp
        for (let i = 0; i < item.connectionPoints; i++) {
            const xy = item.getConnectionPoint(hovered, i)
            points.push(
                <g key={i}>
                    <image
                        x={xy.x - 2.5} y={xy.y - 2.5}
                        width="5" height="5" href="/images/point.gif" preserveAspectRatio="none"
                        className="line-handle"
                        pointerEvents="all"
                        onMouseDown={this.onMouseDownLineHandle.bind(this, i, xy, hovered)}
                        onMouseOver={this.onMouseOverHoverPoint.bind(this, hovered, i)}/>
                </g>
            )

            if (i === hoverPoint) {
                hoverPointComp = (
                    <g>
                        <ellipse
                            cx={xy.x} cy={xy.y} rx="10" ry="10" fillOpacity="0.3" fill="#00ff00" stroke="#00ff00"
                            strokeOpacity="0.3" pointerEvents="none"/>
                    </g>
                )
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const {x, y, w, h} = hovered

        return (
            <g
                pointerEvents="all"
                onMouseLeave={this.onMouseOutObject.bind(this, hovered)}>
                <g style={{cursor: 'move'}}>
                    <rect
                        x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill="none" stroke="transparent"
                        className="object"
                        onMouseDown={this.onMouseDownObject.bind(this, hovered)}/>
                    {hoverPointComp}
                </g>
                <g>
                    {points}
                </g>

                {this.renderInfoButton(hovered)}
                {this.renderEditButton(hovered)}
            </g>
        )
    }

    renderInfoButton (obj) {
        const {hideInfo} = this.props
        if (hideInfo) return null
        const {x, y, w, h, data} = obj
        if (data.uiprops.type !== 'GROUP') return null
        return (
            <g style={{cursor: 'pointer'}}>
                <image
                    x={x + w - 24} y={y + h + 4}
                    width="20" height="20" href="/images/info.png"
                    onMouseDown={this.onMouseDownInfo.bind(this, obj)}
                />
            </g>
        )
    }

    renderEditButton (obj) {
        const {x, y, w, h} = obj
        return (
            <g style={{cursor: 'pointer'}}>
                <image
                    x={x + w - 48} y={y + h + 4}
                    width="20" height="20" href="/images/edit.png"
                    onMouseDown={this.onMouseDownEdit.bind(this, obj)}
                />
            </g>
        )
    }

    renderDragging () {
        const {isDragging, mouseDownPos, cursorPos, selected} = this.props
        if (!isDragging) return null

        const offsetX = cursorPos.x - mouseDownPos.x
        const offsetY = cursorPos.y - mouseDownPos.y

        return selected.filter(obj => obj.type === DiagramTypes.OBJECT).map(obj =>
            <g key={`dragging-${obj.id}`} style={{cursor: 'move'}}>
                <rect
                    x={obj.x + offsetX} y={obj.y + offsetY} width={obj.w} height={obj.h} fill="none" stroke="#000000"
                    strokeDasharray="3 3" pointerEvents="none"/>
            </g>
        )
    }

    renderDraggingHint () {
        const {isDragging, mouseDownPos, cursorPos, selected} = this.props
        if (!isDragging) return null

        const object = selected.filter(obj => obj.type === DiagramTypes.OBJECT)[0]
        const {w, h} = object
        const x = parseInt(object.x + cursorPos.x - mouseDownPos.x, 10)
        const y = parseInt(object.y + cursorPos.y - mouseDownPos.y, 10)
        const text = `${x}, ${y}`
        return (
            <div
                className="geHint"
                style={{left: `${x + w / 2 - 6.1 * text.length / 2 - 16}px`, top: `${y + h + 16}px`}}>{text}</div>
        )
    }

    renderDefs () {
        return (
            <defs>
                <marker
                    id="arrowEnd" viewBox="0 0 8000 8000" refX="180" refY="150"
                    markerWidth="240" markerHeight="240" orient="auto" fill="RGB(0,0,255)" strokeLinejoin="bevel">
                    <path stroke="RGB(0,0,255)" d="M1 59,200 148,1 243,20 151,Z"/>
                </marker>
            </defs>
        )
    }

    render () {
        const {connectDropTarget, popoverTarget} = this.props
        return connectDropTarget(
            <div
                className="draw-panel flex-1"
                onMouseDown={this.onMouseDownPanel.bind(this)}
                onMouseMove={this.onMouseMovePanel.bind(this)}
                onMouseUp={this.onMouseUpPanel.bind(this)}>
                <svg style={style} ref={this.onSvgRef.bind(this)}>
                    {this.renderDefs()}
                    {this.renderLines()}
                    {this.renderObjects()}
                    {this.renderDrawingLines()}
                    <g>
                        {this.renderSelected()}
                        {this.renderHovered()}
                        {this.renderDragging()}
                    </g>
                </svg>
                {popoverTarget}
                {this.renderDraggingHint()}
            </div>
        )
    }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
