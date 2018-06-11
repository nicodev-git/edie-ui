import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Audit from 'components/sidebar/audit/Audit'
import {
  findAuditByDate,
  fetchProgressWorkflows,
  fetchFinishedWfs,

  showAuditDetailModal
} from 'actions'

class AuditContainer extends React.Component {
  render () {
    return (
      <Audit {...this.props} />
    )
  }
}
export default connect(
  state => ({
    audit: state.audit.audit,
    auditPage: state.audit.auditPage,
    progressWfs: state.workflow.progressWfs,
    finishedWfs: state.workflow.finishedWfs,
    auditModalOpen: state.audit.auditModalOpen,

    auditDetailModalOpen: state.audit.auditDetailModalOpen,
    auditDetail: state.audit.auditDetail
  }), {
    findAuditByDate,
    fetchProgressWorkflows,
    fetchFinishedWfs,

    showAuditDetailModal
  }
)(withRouter(AuditContainer))
