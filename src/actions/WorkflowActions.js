import axios from 'axios'
import { merge, assign, findIndex, reverse, sortBy } from 'lodash'
import {
  FETCH_WORKFLOW,

  SHOW_WF_TAG_MODAL,
  ADD_WORKFLOW_TAG,
  REMOVE_WORKFLOW_TAG,

  OPEN_DEVICE_WF_DIAGRAM_MODAL,
  CLOSE_DEVICE_WF_DIAGRAM_MODAL,

  FETCH_WORKFLOWS,
  ADD_WORKFLOW,
  UPDATE_WORKFLOW,
  REMOVE_WORKFLOW,

  SHOW_WORKFLOW_NAME_MODAL,

  SELECT_WORKFLOW,

  SHOW_WF_TASK_MODAL,

  UPDATE_FLOW_ITEM,
  REMOVE_FLOW_ITEM,

  UPDATE_WORKFLOW_SAVE_STATE,

  FETCH_PROGRESS_WFS,
  SHOW_WF_MAPPNIG_MODAL,
  FETCH_FINISHED_WFS,

  FETCH_GROUPS,
  SHOW_GROUP_MODAL,
  ADD_GROUP,
  UPDATE_GROUP,
  REMOVE_GROUP,

  FETCH_GLOBAL_VARS,
  FETCH_SHAPES,
  ADD_SHAPE,
  UPDATE_SHAPE,

  SHOW_USER_PICK_MODAL,
  SHOW_WF_SETTING_MODAL,

  SHOW_WF_SIMULATION_MODAL,
  UPDATE_WF_SIM_RES,
  UPDATE_WF_SIM_STATE,

  FETCH_SIM_SAMPLES,
  ADD_SIM_SAMPLE,
  REMOVE_SIM_SAMPLE,

  FETCH_TEST_GROUPS,
  ADD_TEST_GROUP,
  UPDATE_TEST_GROUP,
  REMOVE_TEST_GROUP,

  FETCH_TEST_CASES,
  ADD_TEST_CASE,
  UPDATE_TEST_CASE,
  REMOVE_TEST_CASE,

  FETCH_TEST_INCIDENTS, REMOVE_SHAPE
} from './types'
import { sortArray, DiagramTypes } from 'shared/Global'
import { ROOT_URL } from 'actions/config'

import {
  addDiagramObject, updateDiagramObject, removeDiagramSelectedObjects,
  openDiagramModal,
  addDiagramLine,
  moveDiagramSelectedObjects,
  updateDiagramWorkflow,
  updateDiagramLine
} from './DiagramActions'

export const openDeviceWfDiagramModal = (stateId, diagram, flow) => {
  return (dispatch) => {
    dispatch({type: OPEN_DEVICE_WF_DIAGRAM_MODAL, flow})
    dispatch(openDiagramModal(stateId, diagram, flow))
  }
}

export const closeDeviceWfDiagramModal = (stateId) => {
  return (dispatch) => {
    dispatch({type: CLOSE_DEVICE_WF_DIAGRAM_MODAL})
  }
}

export const fetchWorkflows = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/getAllFlows`).then(res => {
      dispatch({type: FETCH_WORKFLOWS, data: reverse(sortArray(res.data || [], 'updated')), diagrams: []})
    }).catch(() => {
      dispatch({type: FETCH_WORKFLOWS, data: ['New Workflow'], diagrams: []})
    })
  }
}

export const fetchWorkflow = (id, cb) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/getFlow`, {
      params: {id}
    }).then(res => {
      if (res.data) dispatch({type: UPDATE_WORKFLOW, data: res.data})
      cb && cb(res.data)
    }).catch(() => {
      cb && cb()
    })
  }
}

export const fetchWorkflowByName = (name, cb) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/getFlowByName`, {
      params: {name}
    }).then(res => {
      if (res.data) dispatch({type: UPDATE_WORKFLOW, data: res.data})
      cb && cb(res.data)
    }).catch(() => {
      cb && cb()
    })
  }
}

export const addWorkflow = (data, cb) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/addFlow`, data).then(res => {
      if (res.data) {
        dispatch({type: ADD_WORKFLOW, data: res.data})
        cb && cb(res.data)
      } else {
        cb && cb()
      }
    }).catch(() => {
      cb && cb()
    })
  }
}

export const addIncidentCellAndWorkflow = (data) => {
  return dispatch => {

  }
}

const getTargetIds = (item) => {
  const lines = item.uiprops.lines || []
  const ids = []
  lines.forEach(line => {
    if (line.targetUuid) ids.push(line.targetUuid)
  })
  return ids
}
const orderSteps = (flow) => {
  const steps = []
  const targets = []
  const targetIds = []
  const flowIds = []
  const items = flow.flowItems || flow.flowItemDetails

  items.forEach(item => {
    const ids = getTargetIds(item)
    targetIds.push(ids)
    ids.forEach(id => {
      if (!targets.includes(id)) targets.push(id)
    })
    flowIds.push(item.id)
  })

  if (targets.length >= flowIds.length) return flow

  let ids = flowIds.filter(p => !targets.includes(p))
  while(true) {
    const startId = ids.filter(p => flowIds.includes(p))[0]
    if (!startId) break
    const index = flowIds.indexOf(startId)
    steps.push(items[index])
    ids = targetIds[index]
  }

  const flowItems = [...steps]
  items.forEach(p => {
    if (!flowItems.includes(p)) flowItems.push(p)
  })
  flowItems.forEach((p, i) => {
    p.step = i + 1
  })

  const entity = {...flow}
  if (flow.flowItems) entity.flowItems = flowItems
  else entity.flowItemDetails = flowItems

  return entity
}

export const updateWorkflow = (data, cb) => {
  return dispatch => {
    dispatch({type: UPDATE_WORKFLOW_SAVE_STATE, data: true})

    axios.post(`${ROOT_URL}/updateFlow`, data).then(res => {
      dispatch({type: UPDATE_WORKFLOW_SAVE_STATE, data: false})
      if (res.data) {
        dispatch({type: UPDATE_WORKFLOW, data: res.data})
        cb && cb(res.data)
      } else {
        cb && cb()
      }
    }).catch(() => {
      dispatch({type: UPDATE_WORKFLOW_SAVE_STATE, data: false})
      cb && cb()
    })
  }
}

export const removeWorkflow = (data) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/deleteFlow`, data).then(res => {
      if (res.data.success) {
        dispatch({type: REMOVE_WORKFLOW, data})
      }
    })
  }
}

export const selectWorkflow = (workflow) => {
  return dispatch => {
    dispatch({type: SELECT_WORKFLOW, workflow})
  }
}

export const showWfRuleModal = (visible, stateId, node) => {
  return dispatch => {
    // if (visible) {
    //     fetchRuleItems(node, items => {
    //         const data = {
    //             objects: [],
    //             lines: [],
    //             lastId: 0
    //         }
    //
    //         let x = 20
    //         data.objects = items.map((f, i) => {
    //             const name = f.function
    //             const w = name.length * 7
    //             const obj = {
    //                 name,
    //                 imgIndex: 0,
    //
    //                 x: x,
    //                 y: 100,
    //                 w: w,
    //                 h: 54,
    //
    //                 id: data.lastId++,
    //                 type: DiagramTypes.OBJECT,
    //                 config: {},
    //                 data: f
    //             }
    //             x += w + 30
    //             return obj
    //         })
    //
    //         dispatch(openDiagramModal(stateId, JSON.stringify(data), node.refId))
    //         dispatch({type: SHOW_WF_RULE_MODAL, visible})
    //     })
    // } else {
    //     dispatch({type: SHOW_WF_RULE_MODAL, visible})
    // }
  }
}

export const showWfTaskModal = (visible, parentStateId, parentFlow, stateId, object, history) => {
  return dispatch => {
    if (visible) {
      if (object.data.subFlowId) {
        // fetchWorkflow(object.data.subFlowId, flow => {
        //     if (flow) {
        //         const data = drawFlows(flow.flowItems || [])
        //         dispatch(openDiagramModal(stateId, JSON.stringify(data), flow))
        //         dispatch({type: SHOW_WF_TASK_MODAL, visible})
        //     } else {
        //         console.log('Fetch flow failed')
        //     }
        // })
        dispatch(closeDeviceWfDiagramModal())
        history.push(`/workflow/${object.data.subFlowId}/edit`)
      } else {
        const flow = {
          name: 'sub',
          description: '',
          flowItems: []
        }

        dispatch(addWorkflow(flow, flowSuccess => {
          if (flowSuccess) {
            dispatch(updateFlowItem (parentStateId, parentFlow, object, () => {
              // const data = drawFlows(flow.flowItems || [])
              // dispatch(openDiagramModal(stateId, JSON.stringify(data), flow))
              // dispatch({type: SHOW_WF_TASK_MODAL, visible})
              dispatch(closeDeviceWfDiagramModal())
              history.push(`/workflow/${flow.id}/edit`)
            }))
          } else {
            console.log('Flow add failed.')
          }
        }))
      }
    } else {
      dispatch({type: SHOW_WF_TASK_MODAL, visible})
    }
  }
}

export function addFlowItem (stateId, flow, object) {
  return dispatch => {
    const entity = orderSteps({
      ...flow,
      flowItems: [...(flow.flowItems || []), object.data]
    })
    dispatch(updateWorkflow(entity, saved => {
      // object.name = props.name
      if (!stateId) return
      dispatch(updateDiagramWorkflow(stateId, entity))
      dispatch(addDiagramObject(stateId, object))
    }))
  }
}

export function updateFlowItem (stateId, flow, object, cb) {
  return dispatch => {
    const entity = orderSteps({
      ...flow,
      flowItems: flow.flowItems.map(p => p.uuid === object.data.uuid ? object.data : p)
    })
    dispatch(updateWorkflow(entity, saved => {
      if (!stateId) return
      dispatch({type: UPDATE_FLOW_ITEM, data: object.data, stateId})
      dispatch(updateDiagramObject(stateId, object))
      dispatch(updateDiagramWorkflow(stateId, entity))
      cb && cb()
    }))
  }
}

export function updateFlowItems (stateId, flow, objects, cb) {
  return dispatch => {
    const entity = orderSteps({
      ...flow,
      flowItems: flow.flowItems.map(p => {
        const index = findIndex(objects, {data: {uuid: p.uuid}})
        if (index < 0) return p
        return objects[index]
      })
    })
    dispatch(updateWorkflow(entity, saved => {
      objects.forEach(object => {
        dispatch({type: UPDATE_FLOW_ITEM, data: object.data, stateId})
        dispatch(updateDiagramObject(stateId, object))
      })
      dispatch(updateDiagramWorkflow(stateId, entity))
      cb && cb()
    }))
  }
}

export function removeFlowItem (stateId, flow, objects, lines) {
  return dispatch => {
    if (!objects.length) return
    if (objects[0].type === DiagramTypes.OBJECT) {
      const uuids = objects.filter(p => !!p.data).map(p => p.data.uuid)
      let entity = {
        ...flow,
        flowItems: flow.flowItems.filter(p => !uuids.includes(p.uuid))
      }

      ///////////////////////////
      const filteredLines = lines.filter(line => line.endObject.data.uuid === objects[0].data.uuid)
      const entities = []
      filteredLines.forEach(line => {
        const entity = line.startObject.data
        const index = findIndex(entity.uiprops.lines, {targetUuid: objects[0].data.uuid})
        if (index >= 0) entity.uiprops.lines.splice(index, 1)
        if (findIndex(entities, {data: {uuid: entity.uuid}}) < 0)
          entities.push(line.startObject)
      })
      entity.flowItems = entity.flowItems.map(p => {
        const index = findIndex(entities, {data: {uuid: p.uuid}})
        if (index < 0) return p
        return entities[index].data
      })
      entity = orderSteps(entity)
      ///////////////////////////

      dispatch(updateWorkflow(entity, saved => {
        entities.forEach(object => {
          dispatch({type: UPDATE_FLOW_ITEM, data: object.data, stateId})
          dispatch(updateDiagramObject(stateId, object))
        })

        dispatch({type: REMOVE_FLOW_ITEM, data: objects, stateId})
        dispatch(removeDiagramSelectedObjects(stateId, objects))

        dispatch(updateDiagramWorkflow(stateId, entity))
      }))
    } else if (objects[0].type === DiagramTypes.LINE) {
      let entity = {
        ...flow
      }

      objects.forEach(line => {
        const startData = line.startObject.data
        const index = findIndex(startData.uiprops.lines, {targetUuid: line.endObject.data.uuid})
        startData.uiprops.lines.splice(index, 1)
        entity.flowItems = entity.flowItems.map(p => p.uuid === startData.uuid ? startData : p)
      })

      entity = orderSteps(entity)

      dispatch(updateWorkflow(entity, saved => {
        objects.forEach(line => dispatch(updateDiagramObject(stateId, line.startObject)))
        dispatch({type: REMOVE_FLOW_ITEM, data: objects, stateId})
        dispatch(removeDiagramSelectedObjects(stateId, objects))
        dispatch(updateDiagramWorkflow(stateId, entity))
      }))
    }

  }
}

export function moveFlowItems (stateId, flow, offset, workflowItems, selected) {
  return dispatch => {
    const objects = []
    selected.forEach(obj => {
      if (obj.type !== DiagramTypes.OBJECT) return true

      const entity = assign({}, obj.data)
      entity.uiprops = assign({}, entity.uiprops, {
        x: obj.x + offset.x,
        y: obj.y + offset.y,
        w: obj.w,
        h: obj.h,
        fill: obj.fill
      })

      obj.data = entity
      objects.push(obj)
    })

    const entity = orderSteps({
      ...flow,
      flowItems: flow.flowItems.map(p => {
        const index = findIndex(objects, {data: {uuid: p.uuid}})
        if (index < 0) return p
        return objects[index].data
      })
    })

    dispatch(updateWorkflow(entity, saved => {

    }))
    objects.forEach(object => {
      dispatch({type: UPDATE_FLOW_ITEM, data: object.data, stateId})
    })
    dispatch(updateDiagramWorkflow(stateId, entity))
    dispatch(moveDiagramSelectedObjects(stateId, offset, workflowItems, selected))
  }
}

export function changeFlowItemFill (stateId, color, obj) {
  return dispatch => {
    const entity = merge({}, obj.data, {
      uiprops: {
        fill: color
      }
    })
    return axios.put(entity._links.self.href, entity).then(({data}) => {
      obj.fill = color
      obj.data = data
      dispatch(updateDiagramObject(stateId, obj))
    })
  }
}

export function addFlowLine (stateId, flow, line) {
  return dispatch => {
    const object = line.startObject
    object.data.uiprops.lines.push({
      targetUuid: line.endObject.data.uuid,
      startPoint: line.startPoint,
      endPoint: line.endPoint
    })

    const entity = orderSteps({
      ...flow,
      flowItems: flow.flowItems.map(p => p.uuid === object.data.uuid ? object.data : p)
    })
    dispatch(updateWorkflow(entity, saved => {
      dispatch(addDiagramLine(stateId, line))
      dispatch(updateDiagramWorkflow(stateId, entity))
    }))
  }
}

export function updateFlowLine(stateId, flow, oldLine, newLine) {
  return dispatch => {
    let object = oldLine.startObject
    const index = findIndex(object.data.uiprops.lines, {
      targetUuid: oldLine.endObject.data.uuid,
      startPoint: oldLine.startPoint,
      endPoint: oldLine.endPoint
    })
    if (index >= 0) object.data.uiprops.lines.splice(index, 1)

    object = newLine.startObject
    object.data.uiprops.lines.push({
      targetUuid: newLine.endObject.data.uuid,
      startPoint: newLine.startPoint,
      endPoint: newLine.endPoint
    })

    const entity = orderSteps({
      ...flow,
      flowItems: flow.flowItems.map(p => {
        if (p.uuid === oldLine.startObject.data.uuid) return oldLine.startObject.data
        if (p.uuid === newLine.startObject.data.uuid) return newLine.startObject.data
        return p
      })
    })
    dispatch(updateWorkflow(entity, saved => {
      dispatch(updateDiagramLine(stateId, newLine))
      dispatch(updateDiagramWorkflow(stateId, entity))
    }))
  }
}

export function addFlowDetailItem(stateId, parentFlow, flow, object) {
  return dispatch => {
    const item = orderSteps({
      ...flow,
      flowItemDetails: [...(flow.flowItemDetails || []), object.data]
    })

    const entity = {
      ...parentFlow,
      flowItems: parentFlow.flowItems.map(p => p.uuid === item.uuid ? item : p)
    }

    dispatch(updateWorkflow(entity, saved => {
      dispatch(updateDiagramWorkflow(stateId, item))
      dispatch(addDiagramObject(stateId, object))
    }))
  }
}

export function updateFlowDetailItem(stateId, parentFlow, flow, object) {
  return dispatch => {
    const item = orderSteps({
      ...flow,
      flowItemDetails: flow.flowItemDetails.map(p => p.uuid === object.data.uuid ? object.data : p)
    })

    const entity = {
      ...parentFlow,
      flowItems: parentFlow.flowItems.map(p => p.uuid === item.uuid ? item : p)
    }

    dispatch(updateWorkflow(entity, saved => {
      dispatch(updateDiagramWorkflow(stateId, item))
      dispatch(updateDiagramObject(stateId, object))
    }))
  }
}

export function removeFlowDetailItem(stateId, parentFlow, flow, objects) {
  return dispatch => {
    if (objects[0].type === DiagramTypes.OBJECT) {
      const item = orderSteps({
        ...flow,
        flowItemDetails: flow.flowItemDetails.filter(p => p.uuid !== objects[0].data.uuid)
      })

      const entity = {
        ...parentFlow,
        flowItems: parentFlow.flowItems.map(p => p.uuid === item.uuid ? item : p)
      }

      dispatch(updateWorkflow(entity, saved => {
        dispatch(updateDiagramWorkflow(stateId, item))
        dispatch(removeDiagramSelectedObjects(stateId, objects))
      }))
    }  else if (objects[0].type === DiagramTypes.LINE) {
      let itemEntity = {
        ...flow
      }

      objects.forEach(line => {
        const startData = line.startObject.data
        const index = findIndex(startData.uiprops.lines, {targetUuid: line.endObject.data.uuid})
        startData.uiprops.lines.splice(index, 1)
        itemEntity.flowItemDetails = itemEntity.flowItemDetails.map(p => p.uuid === startData.uuid ? startData : p)
      })

      itemEntity = orderSteps(itemEntity)

      const entity = {
        ...parentFlow,
        flowItems: parentFlow.flowItems.map(p => p.uuid === itemEntity.uuid ? itemEntity : p)
      }

      dispatch(updateWorkflow(entity, saved => {
        objects.forEach(line => dispatch(updateDiagramObject(stateId, line.startObject)))
        dispatch(removeDiagramSelectedObjects(stateId, objects))
        dispatch(updateDiagramWorkflow(stateId, itemEntity))
      }))
    }
  }
}

export function moveFlowDetailItems(stateId, parentFlow, flow, offset, workflowItems, selected) {
  return dispatch => {
    const objects = []
    selected.forEach(obj => {
      if (obj.type !== DiagramTypes.OBJECT) return true

      const entity = assign({}, obj.data)
      entity.uiprops = assign({}, entity.uiprops, {
        x: obj.x + offset.x,
        y: obj.y + offset.y,
        w: obj.w,
        h: obj.h,
        fill: obj.fill
      })

      obj.data = entity
      objects.push(obj)
    })

    const item = orderSteps({
      ...flow,
      flowItemDetails: flow.flowItemDetails.map(p => {
        const index = findIndex(objects, {data: {uuid: p.uuid}})
        if (index < 0) return p
        return objects[index].data
      })
    })

    const entity = {
      ...parentFlow,
      flowItems: parentFlow.flowItems.map(p => p.uuid === item.uuid ? item : p)
    }

    dispatch(updateWorkflow(entity))
    objects.forEach(object => {
      dispatch({type: UPDATE_FLOW_ITEM, data: object.data, stateId})
    })
    dispatch(updateDiagramWorkflow(stateId, item))
    dispatch(moveDiagramSelectedObjects(stateId, offset, workflowItems, selected))
  }
}

export function addFlowDetailLine (stateId, parentFlow, flow, line) {
  return dispatch => {
    const object = line.startObject
    object.data.uiprops.lines.push({
      targetUuid: line.endObject.data.uuid,
      startPoint: line.startPoint,
      endPoint: line.endPoint
    })

    const itemEntity = orderSteps({
      ...flow,
      flowItemDetails: flow.flowItemDetails.map(p => p.uuid === object.data.uuid ? object.data : p)
    })

    const entity = {
      ...parentFlow,
      flowItems: parentFlow.flowItems.map(p => p.uuid === itemEntity.uuid ? itemEntity : p)
    }
    dispatch(updateWorkflow(entity, saved => {
      dispatch(addDiagramLine(stateId, line))
      dispatch(updateDiagramWorkflow(stateId, itemEntity))
    }))
  }
}

export function updateFlowDetailLine (stateId, parentFlow, flow, oldLine, newLine) {
  return dispatch => {
    let object = oldLine.startObject
    const index = findIndex(object.data.uiprops.lines, {
      targetUuid: oldLine.endObject.data.uuid,
      startPoint: oldLine.startPoint,
      endPoint: oldLine.endPoint
    })
    if (index >= 0) object.data.uiprops.lines.splice(index, 1)

    object = newLine.startObject

    object.data.uiprops.lines.push({
      targetUuid: newLine.endObject.data.uuid,
      startPoint: newLine.startPoint,
      endPoint: newLine.endPoint
    })

    const itemEntity = orderSteps({
      ...flow,
      flowItemDetails: flow.flowItemDetails.map(p => {
        if (p.uuid === oldLine.startObject.data.uuid) return oldLine.startObject.data
        if (p.uuid === newLine.startObject.data.uuid) return newLine.startObject.data
        return p
      })
    })

    const entity = {
      ...parentFlow,
      flowItems: parentFlow.flowItems.map(p => p.uuid === itemEntity.uuid ? itemEntity : p)
    }
    dispatch(updateWorkflow(entity, saved => {
      dispatch(updateDiagramLine(stateId, newLine))
      dispatch(updateDiagramWorkflow(stateId, itemEntity))
    }))
  }
}

export function showWfNameModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_WORKFLOW_NAME_MODAL, visible})
  }
}

export function fetchProgressWorkflows () {
  return dispatch => {
    axios.get(`${ROOT_URL}/getAllClonedFlows`).then(res => {
      dispatch({type: FETCH_PROGRESS_WFS, data: res.data || []})
    })
  }
}

export function showWfMappingModal (visible) {
  return dispatch => {
    dispatch({type: SHOW_WF_MAPPNIG_MODAL, visible})
  }
}

export function fetchGroups () {
  return dispatch => {
    axios.get(`${ROOT_URL}/getAllFlowGroups`).then(res => {
      const data = res.data || []
      dispatch({type: FETCH_GROUPS, data: sortBy(data, a => a.name.toLowerCase())})
    })
  }
}

export function showGroupModal (visible, group) {
  return dispatch => {
    dispatch({type: SHOW_GROUP_MODAL, visible, group})
  }
}

export function addGroup (group) {
  return dispatch => {
    axios.post(`${ROOT_URL}/addFlowGroup`, group).then(res => {
      if (res.data) {
        dispatch({type: ADD_GROUP, data: res.data})
      }
    })
  }
}

export function updateGroup (group) {
  return dispatch => {
    axios.post(`${ROOT_URL}/updateFlowGroup`, group).then(res => {
      if (res.data) {
        dispatch({type: UPDATE_GROUP, data: res.data})
      }
    })
  }
}

export function removeGroup (group) {
  return dispatch => {
    axios.post(`${ROOT_URL}/deleteFlowGroup`, group).then(res => {
      if (res.data.success) {
        dispatch({type: REMOVE_GROUP, data: group})
      }
    })
  }
}

export function fetchFinishedWfs(lastOnly, messageUniqueId) {
  return dispatch => {
    dispatch({type: FETCH_FINISHED_WFS, data: []})
    axios.get(`${ROOT_URL}/getFinishedFlowAudit`, {
      params: {lastOnly, messageUniqueId}
    }).then(res => {
      dispatch({type: FETCH_FINISHED_WFS, data: res.data || []})
    })
  }
}

export function fetchGlobalVars () {
  return dispatch => {
    axios.get(`${ROOT_URL}/getAllGlobalVars`).then(res => {
      dispatch({type: FETCH_GLOBAL_VARS, data: res.data || []})
    })
  }
}

export function showUserPickModal(visible) {
  return dispatch => {
    dispatch({type: SHOW_USER_PICK_MODAL, visible})
  }
}

export function fetchShapes() {
  return dispatch => {
    axios.get(`${ROOT_URL}/shape/getAll`).then(res => {
      dispatch({type: FETCH_SHAPES, data: res.data || []})
    })
  }
}

export function addShape (entity) {
  return dispatch => {
    axios.post(`${ROOT_URL}/shape`, entity).then(res => {
      if (res.data) dispatch({type: ADD_SHAPE, data: res.data})
    })
  }
}

export function updateShape (entity) {
  return dispatch => {
    axios.put(`${ROOT_URL}/shape/${entity.id}`, entity).then(res => {
      if (res.data) dispatch({type: UPDATE_SHAPE, data: res.data})
    })
  }
}

export function removeShape(entity) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/shape/${entity.id}`).then(res => {
      if (res.data) dispatch({type: REMOVE_SHAPE, data: res.data})
    })
  }
}

export function showWfSettingModal(visible, data)  {
  return dispatch => {
    dispatch({type: SHOW_WF_SETTING_MODAL, visible, data})
  }
}

export function fetchWfSetting(customerId, openModal) {
  return dispatch => {
    axios.get(`${ROOT_URL}/getFlowSetting`, {
      params: {customerId}
    }).then(res => {
      if (openModal) {
        dispatch(showWfSettingModal(true, res.data || {}))
      }
    })
  }
}

export function saveWfSetting(data) {
  return dispatch => {
    axios.post(`${ROOT_URL}/saveFlowSetting`, data)
  }
}

//////////////////////////////

export const setWorkflow = (data) => {
  return dispatch => {
    dispatch({type: FETCH_WORKFLOW, data})
  }
}

export const addWorkflowTag = (tag) => {
  return dispatch => {
    dispatch({type: ADD_WORKFLOW_TAG, tag})
  }
}

export const removeWorkflowTag = (index) => {
  return dispatch => {
    dispatch({type: REMOVE_WORKFLOW_TAG, index})
  }
}

export const showWorkflowTagModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_WF_TAG_MODAL, visible})
  }
}

export const showWfSimulationModal = (visible) => {
  return dispatch => {
    dispatch({type: SHOW_WF_SIMULATION_MODAL, visible})
  }
}

export const simulateWfMessage = (type, data, cb) => {
  return dispatch => {
    dispatch({type: UPDATE_WF_SIM_STATE, data: true})
    dispatch({type: UPDATE_WF_SIM_RES, data: ''})

    const url = type === 'syslog' ? 'simulateConnector' : 'simulateMessages'

    axios.post(`${ROOT_URL}/${url}`, data).then(res => {
      dispatch({type: UPDATE_WF_SIM_RES, data: res.data.success ? '' : 'Failed'})
      dispatch({type: UPDATE_WF_SIM_STATE, data: false})
      cb && cb()
    }).catch(() => {
      dispatch({type: UPDATE_WF_SIM_RES, data: 'Connection failed'})
      dispatch({type: UPDATE_WF_SIM_STATE, data: false})
    })
  }
}

export const fetchSimSamples = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/simsample?size=1000`).then(res => {
      dispatch({type: FETCH_SIM_SAMPLES, data: res.data._embedded.simSamples})
    })
  }
}

export const addSimSample = (data) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/simsample`, data).then(res => {
      dispatch({type: ADD_SIM_SAMPLE, data: res.data})
    })
  }
}

export const removeSimSample = (entity) => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/simsample/${entity.id}`).then(res => {
      dispatch({type: REMOVE_SIM_SAMPLE, data: entity})
    })
  }
}

//////////////////////////////////////////////////////////////////////////////////////

export const fetchTestGroups = (entity) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/flowtestgroup?size=1000`).then(res => {
      dispatch({type: FETCH_TEST_GROUPS, data: sortBy(res.data, a => a.name.toLowerCase())})
    })
  }
}

export const fetchTestCases = (entity) => {
  return dispatch => {
    axios.get(`${ROOT_URL}/flowtestcase?size=1000`).then(res => {
      dispatch({type: FETCH_TEST_CASES, data: res.data})
    })
  }
}

export const addTestGroup = (entity) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/flowtestgroup`, entity).then(res => {
      dispatch({type: ADD_TEST_GROUP, data: res.data})
    })
  }
}

export const updateTestGroup = (entity) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/flowtestgroup`, entity).then(res => {
      dispatch({type: UPDATE_TEST_GROUP, data: res.data})
    })
  }
}

export const removeTestGroup = (entity) => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/flowtestgroup/${entity.id}`).then(res =>{
      dispatch({type: REMOVE_TEST_GROUP, data: entity})
    })
  }
}

export const addTestCase = (entity, cb) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/flowtestcase`, entity).then(res => {
      dispatch({type: ADD_TEST_CASE, data: res.data})
      cb && cb(res.data)
    })
  }
}

export const updateTestCase = (entity) => {
  return dispatch => {
    axios.put(`${ROOT_URL}/flowtestcase/${entity.id}`, entity).then(res => {
      dispatch({type: UPDATE_TEST_CASE, data: res.data})
    })
  }
}

export const removeTestCase = (entity) => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/flowtestcase/${entity.id}`).then(res =>{
      dispatch({type: REMOVE_TEST_CASE, data: entity})
    })
  }
}

export const fetchTestIncidents = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/getTestQueueList`).then(res => {
      dispatch({type: FETCH_TEST_INCIDENTS, data: res.data})
    })
  }
}

export const resetCustomerFlow = (data) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/resetCustomerFlow`, data).then(res => {
      if (res.data) {
        dispatch({type: UPDATE_WORKFLOW, data: res.data})
      }
    }).catch(() => {
    })
  }
}
