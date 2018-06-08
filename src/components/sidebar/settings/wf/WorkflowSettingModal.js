import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import WorkflowSettingModalView from './WorkflowSettingModalView'

class WorkflowSettingModal extends React.Component {
    onSubmit (values) {
        const entity = {
            ...values,
        }

        this.props.onSave(entity)
        this.onClickClose()
    }
    onClickClose () {
        this.props.onClose()
    }

    render () {
        const { handleSubmit } = this.props
        return (
            <WorkflowSettingModalView
                {...this.props}
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onClickClose={this.onClickClose.bind(this)}
            />
        )
    }
}

export default connect(
    (state) => ({
        initialValues: state.workflow.editWfSetting
    })
)(reduxForm({form: 'wfSettingForm'})(WorkflowSettingModal))