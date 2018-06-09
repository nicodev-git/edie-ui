import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import FlowGroupModalView from './FlowGroupModalView'

class FlowGroupModal extends Component {
    handleFormSubmit (props) {
        this.props.onSave(props)
    }

    onHide () {
        this.props.onClose()
    }

    render () {
        const {handleSubmit} = this.props
        return (
            <FlowGroupModalView
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                onClickClose={this.onHide.bind(this)}
            />
        )
    }
}

export default connect(
    state => ({
        initialValues: state.workflow.editGroup
    })
)(reduxForm({form: 'wfGroupForm'})(FlowGroupModal))
