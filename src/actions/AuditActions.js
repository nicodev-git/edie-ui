import axios from 'axios'
import {
    FETCH_AUDIT,
    FETCH_AUDIT_PAGE,
    SHOW_AUDIT_DETAIL_MODAL,
    SHOW_FLOW_MESSAGE_MODAL,
    SHOW_CONNECTOR_AUDIT_MODAL
} from './types'

import {isArray} from 'lodash'

import {ROOT_URL, CONNECTOR_URL} from 'shared/global'
import {fetchProgressWorkflows, fetchFinishedWfs} from './workflow_actions'
import {getAuthConfig} from './util'
import {requestFlowApi} from 'shared/ReqUtil'

export function fetchAuditByCloned (clonedFlowId) {
    return dispatch => {
        dispatch({type: FETCH_AUDIT, data: []})
        if (!clonedFlowId) return
        axios.get(`${ROOT_URL}/audit/findByCloned?id=${clonedFlowId}`, getAuthConfig()).then(res => {
            dispatch({type: FETCH_AUDIT, data: res.data})
        })
    }
}

export function findAuditByDate(params) {
    return dispatch => {
        axios.get(`${ROOT_URL}/audit/findByDate`, getAuthConfig({params})).then(res => {
            dispatch({type: FETCH_AUDIT_PAGE, data: {
                ...res.data.page,
                page: res.data._embedded.audits
            }})
        })
    }
}

export function showAuditDetailModal(visible, data) {
    return dispatch => {
        dispatch({type: SHOW_AUDIT_DETAIL_MODAL, visible, data})
    }
}

export function showFlowMessageModal(visible, data) {
    return dispatch => {
        dispatch({type: SHOW_FLOW_MESSAGE_MODAL, visible, data})
    }
}

export function showConnectorAuditModal(visible, data) {
    return dispatch => {
        dispatch({type: SHOW_CONNECTOR_AUDIT_MODAL, visible, data})
    }
}
