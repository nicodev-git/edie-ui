import { concat } from 'lodash'

function get2StepLinePoints (start, end, isSidePoint) {
  const points = []
  if (isSidePoint) {
    points.push({ x: start.x + (end.x - start.x) / 2, y: start.y })
    points.push({ x: start.x + (end.x - start.x) / 2, y: end.y })
  } else {
    points.push({ x: start.x, y: start.y + (end.y - start.y) / 2 })
    points.push({ x: end.x, y: start.y + (end.y - start.y) / 2 })
  }

  return points
}

function get3StepLinesPoints (start, end, isSidePoint) {
  const points = []
  if (isSidePoint) {
    points.push({ x: start.x + 20, y: start.y })
    points.push({ x: start.x + 20, y: start.y + 50 })
    points.push({ x: end.x - 20, y: start.y + 50 })
    points.push({ x: end.x - 20, y: end.y })
  } else {

  }
  return points
}

export function findStepLines (startObject, startPos, startPoint, endObject, endPos, endPoint) {
  let points = [{ x: startPos.x, y: startPos.y }]

  if (startObject && endObject) {
    // Case 1 : 2-step lines
    if ((startObject.isTopPoint(startPoint) && endObject.isBottomPoint(endPoint) && startPos.y > endPos.y) ||
      (startObject.isLeftPoint(startPoint) && endObject.isRightPoint(endPoint) && startPos.x > endPos.x) ||
      (startObject.isRightPoint(startPoint) && endObject.isLeftPoint(endPoint) && startPos.x < endPos.x) ||
      (startObject.isBottomPoint(startPoint) && endObject.isTopPoint(endPoint) && startPos.y < endPos.y)) {
      return concat(points, get2StepLinePoints(startPos, endPos, startObject.isLeftPoint(startPoint) || startObject.isRightPoint(startPoint)), endPos)
    }

    // Case 2 : 3-step lines
    if (startObject.isRightPoint(startPoint) && endObject.isLeftPoint(endPoint) && startPos.x > endPos.x) {
      return concat(points, get3StepLinesPoints(startPos, endPos, true), endPos)
    }
  }

  return concat(points, endPos)
}
