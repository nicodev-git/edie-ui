import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import GlobalVars from 'components/sidebar/wf/globalvar/GlobalVars'

import {
    fetchGlobalVars
} from 'actions'

class GlobalVarsContainer extends React.Component {
    render () {
        return (
            <GlobalVars {...this.props}/>
        )
    }
}
export default connect(
    state => ({
        globalVars: state.workflow.globalVars
    }), {
        fetchGlobalVars
    }
)(withRouter(GlobalVarsContainer))
