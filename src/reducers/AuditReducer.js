import {
    FETCH_AUDIT,
    FETCH_AUDIT_PAGE,

    SHOW_AUDIT_DETAIL_MODAL,
    SHOW_FLOW_MESSAGE_MODAL,
    SHOW_CONNECTOR_AUDIT_MODAL
} from 'actions/types'

const initialState = {
  audit: [],
  auditPage: {
    page: [],
    size: 15,
    number: 0,
    totalPages: 0,
    totalElements: 0
  },
  samples: [],
  flowMessage: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_AUDIT:
            return { ...state, audit: action.data }
        case FETCH_AUDIT_PAGE:
            return { ...state, auditPage: action.data }

        case SHOW_AUDIT_DETAIL_MODAL:
            return { ...state, auditDetailModalOpen: action.visible, auditDetail: action.data }

        case SHOW_FLOW_MESSAGE_MODAL:
            return { ...state, flowMessageModalOpen: action.visible, flowMessage: action.data }

        case SHOW_CONNECTOR_AUDIT_MODAL:
            return { ...state, connectorAuditModalOpen: action.visible, connectorMessage: action.data }

        default: return state
    }
}
