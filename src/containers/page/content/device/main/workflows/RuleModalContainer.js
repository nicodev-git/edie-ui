import React from 'react'

import RuleModal from '../../../../../../components/page/content/device/main/workflows/RuleModal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { closeDeviceRuleModal } from '../../../../../../actions'

@connect(
  state => ({
    editRule: state.devices.editRule,
    initialValues: state.devices.editRule
  }), {
    closeDeviceRuleModal
  }
)
@withRouter
export default RuleModal