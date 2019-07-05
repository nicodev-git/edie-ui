import {concat} from 'lodash'

export const stepStart = 30

function get2StepLinePoints (start, end, isSidePoint) {
  const points = []
  if (isSidePoint) {
    if (start.y === end.y) return points
    points.push({x: (end.x + start.x) / 2, y: start.y})
    points.push({x: (end.x + start.x) / 2, y: end.y})
  } else {
    if (start.x === end.x) return points
    points.push({x: start.x, y: (end.y + start.y) / 2})
    points.push({x: end.x, y: (end.y + start.y) / 2})
  }

  return points
}

export function getCenterPoint (start, end) {
  return {x: (start.x + end.x) / 2, y: (start.y + end.y) / 2}
}

export function findStepLines (startObject, startPos, startPoint, endObject, endPos, endPoint) {
  let points = [{x: startPos.x, y: startPos.y}]

  points = concat(points, findStepPoints(startObject, startPos, startPoint, endObject, endPos, endPoint))

  return concat(points, endPos)
}

export function findStepPoints (startObject, startPos, startPoint, endObject, endPos, endPoint) {
  let points = []
  if (startObject && endObject) {
    // Case 1 : 2-step lines
    if ((startObject.isTopPoint(startPoint) && endObject.isBottomPoint(endPoint) && startPos.y > endPos.y) ||
      (startObject.isLeftPoint(startPoint) && endObject.isRightPoint(endPoint) && startPos.x > endPos.x) ||
      (startObject.isRightPoint(startPoint) && endObject.isLeftPoint(endPoint) && startPos.x < endPos.x) ||
      (startObject.isBottomPoint(startPoint) && endObject.isTopPoint(endPoint) && startPos.y < endPos.y)) {
      return concat(points, get2StepLinePoints(startPos, endPos, startObject.isLeftPoint(startPoint) || startObject.isRightPoint(startPoint)))
    } else if (startObject.isBottomPoint(startPoint) && endObject.isBottomPoint(endPoint)) {
      const startY = Math.max(startPos.y + stepStart, endPos.y + stepStart)
      points.push({x: startPos.x, y: startY})
      points.push({x: endPos.x, y: startY})
    } else if (startObject.isTopPoint(startPoint) && endObject.isTopPoint(endPoint)) {
      const startY = Math.min(startPos.y - stepStart, endPos.y - stepStart)
      points.push({x: startPos.x, y: startY})
      points.push({x: endPos.x, y: startY})
    } else if (startObject.isBottomPoint(startPoint) && endObject.isLeftPoint(endPoint) && startPos.x < endPos.x) {
      const startY = Math.max(startPos.y + stepStart, endPos.y)
      points.push({x: startPos.x, y: startY})
      if (startY !== endPos.y) {
        points.push({x: (startPos.x + endPos.x) / 2, y: startY})
        points.push({x: (startPos.x + endPos.x) / 2, y: endPos.y})
      }
    } else if (startObject.isRightPoint(startPoint) && endObject.isBottomPoint(endPoint) && startPos.x < endPos.x && startPos.y > endPos.y) {
      points.push({x: endPos.x, y: startPos.y})
    } else if (startObject.isRightPoint(startPoint) && endObject.isLeftPoint(endPoint) && startPos.x > endPos.x) {
      // Case 2 : 3-step lines
      points.push({x: startPos.x + stepStart, y: startPos.y})
      points.push({x: startPos.x + stepStart, y: startPos.y + 100})
      points.push({x: endPos.x - stepStart, y: startPos.y + 100})
      points.push({x: endPos.x - stepStart, y: endPos.y})
    } else if (startObject.isLeftPoint(startPoint) && endObject.isRightPoint(endPoint) && startPos.x < endPos.x) {
      points.push({x: startPos.x - stepStart, y: startPos.y})
      points.push({x: startPos.x - stepStart, y: startPos.y + 100})
      points.push({x: endPos.x + stepStart, y: startPos.y + 100})
      points.push({x: endPos.x + stepStart, y: endPos.y})
    } else if (startObject.isTopPoint(startPoint) && endObject.isBottomPoint(endPoint) && startPos.y < endPos.y) {
      points.push({x: startPos.x, y: startPos.y - stepStart})
      points.push({x: startPos.x - 100, y: startPos.y - stepStart})
      points.push({x: startPos.x - 100, y: endPos.y + stepStart})
      points.push({x: endPos.x, y: endPos.y + stepStart})
    } else if (startObject.isBottomPoint(startPoint) && endObject.isTopPoint(endPoint) && startPos.y > endPos.y) {
      points.push({x: startPos.x, y: startPos.y + stepStart})
      points.push({x: startPos.x + 100, y: startPos.y + stepStart})
      points.push({x: startPos.x + 100, y: endPos.y - stepStart})
      points.push({x: endPos.x, y: endPos.y - stepStart})
    }
  }
  return points
}

export function getHandlePoints (startPos, stepPoints, endPos) {
  const handlePoints = []
  handlePoints.push(startPos)
  let lastPoint = null
  for (let i = 0; i < stepPoints.length; i++) {
    const point = stepPoints[i]
    if (i) handlePoints.push(getCenterPoint(lastPoint, point))
    lastPoint = point
  }
  handlePoints.push(endPos)
  return handlePoints
}

export function getNearestPoint (startObject, startObjectTpl, startPoint, endObject, endObjectTpl) {
  let dist = -1
  let point = 0
  let pos

  const startPos = startObjectTpl.getConnectionPoint(startObject, startPoint)
  if (startObjectTpl.isTopPoint(startPoint)) startPos.y -= stepStart
  else if (startObjectTpl.isBottomPoint(startPoint)) startPos.y += stepStart
  else if (startObjectTpl.isLeftPoint(startPoint)) startPos.x -= stepStart
  else startPos.x += stepStart
  for (let i = 0; i < endObjectTpl.primaryPoints.length; i++) {
    const currentPoint = endObjectTpl.primaryPoints[i]
    const currentPos = endObjectTpl.getConnectionPoint(endObject, currentPoint)
    const currentDist = Math.abs(currentPos.x - startPos.x) + Math.abs(currentPos.y - startPos.y)
    if (dist < 0 || dist >= currentDist) {
      dist = currentDist
      point = currentPoint
      pos = currentPos
    }
  }

  return {
    pos,
    point
  }
}
