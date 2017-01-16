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

function isTopPoint (point) {
  return point >= 0 && point < 3
}

function isLeftPoint (point) {
  return point === 3 || point === 5 || point === 7
}

function isRightPoint (point) {
  return point === 4 || point === 6 || point === 8
}

function isBottomPoint (point) {
  return point === 9 || point === 10 || point === 11
}

export function findStepLines (startPos, startPoint, endPos, endPoint) {
  let points = [{ x: startPos.x, y: startPos.y }]

  // Case 1 : 2-step lines
  if ((isTopPoint(startPoint) && isBottomPoint(endPoint) && startPos.y > endPos.y) ||
    (isLeftPoint(startPoint) && isRightPoint(endPoint) && startPos.x > endPos.x) ||
    (isRightPoint(startPoint) && isLeftPoint(endPoint) && startPos.x < endPos.x) ||
    (isBottomPoint(startPoint) && isTopPoint(endPoint) && startPos.y < endPos.y)) {
    return concat(points, get2StepLinePoints(startPos, endPos, isLeftPoint(startPoint) || isRightPoint(startPoint)), endPos)
  }

  // Case 2 : 3-step lines

  return concat(points, endPos)
}
